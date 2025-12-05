/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import Loader from "sections/shared/components/Loader/Loader";
import OfferDetailPageStyled from "./OfferDetailPageStyled";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import { getTypesClassNames } from "sections/shared/components/DashboardContentSections/utils/getClassNames/getClassNames";
import { MdOutlineLibraryAdd } from "react-icons/md";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import { FaEdit } from "react-icons/fa";
import OffersForm from "sections/offers/components/OffersForm/OffersForm";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { UserTypes } from "modules/user/domain/User";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import { headerAddressOffers, headerOffers } from "./offersData";
import { Calendar } from "modules/offers/domain/OfferCalendar";
import { useCountryContext } from "sections/country/CountryContext/useCountryContext";
import { useCitiesContext } from "sections/city/CityContext/useCitiesContext";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import CompanySelector from "sections/shared/components/CompanySelector";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";

export interface AddresTableData {
  address: string;
  max_guests: number;
  min_guests: number;
  time: { day: string; start_time: string; end_time: string }[];
}

export const parseCalendar = (calendar: Calendar | Calendar[]) => {
  if (calendar) {
    if (Array.isArray(calendar)) {
      return calendar;
    }
    return [calendar];
  }
  return [];
};

const OfferDetailsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useAuthContext();
  const { id } = useParams();
  const { offer, loading, getOffer, modifyOffer, offers } = useOffersContext();
  const { getAllCountries, countries } = useCountryContext();
  const { cities, getAllCities } = useCitiesContext();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCountries();
    getOffer(+id!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!offer || !offer.location_parent_id) return;
    const filters: FilterParams = {
      country_id: offer.location_parent_id,
    };
    getAllCities(filters);
  }, [offer, offer.location_parent_id, getAllCities]);

  // override url param id
  useEffect(() => {
    if (user.type !== UserTypes.company) return;
    if (!offers[0]?.id) return;
    if (id !== offers[0]?.id?.toString()) {
      navigate(`/oferta/${offers[0]?.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offers[0]?.id]);

  useEffect(() => {
    if (id === offer?.id?.toString() || !id) return;
    getOffer(+id!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleIsModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModifyOffer = async (offer: FormData, offer_id?: number) => {
    const res = await modifyOffer(offer, offer_id);
    if (isHttpSuccessResponse(res)) {
      setIsModalOpen(false);
      getOffer(+id!);
    }
  };

  const parseScheduleHours = (schedule: string) => {
    const splitted = schedule.split(":");
    return `${splitted[0]}:${splitted[1]}`;
  };

  const getOfferWithDayTime = (calendars: Calendar[]): AddresTableData[] => {
    const a = calendars.map((calendar) => {
      // Flatten all time entries from all days and all time slots
      const timeEntries: {
        day: string;
        start_time: string;
        end_time: string;
      }[] = [];

      calendar.week.forEach((dayGroup) => {
        // dayGroup is an array of TimeSlotOffer objects for a specific day
        // Typically there's one TimeSlotOffer per day, but we'll handle multiple
        dayGroup.forEach((timeSlotOffer) => {
          const dayName = timeSlotOffer.day_name;

          // time_slot is an array of TimeSlot objects (can have multiple shifts)
          if (Array.isArray(timeSlotOffer.time_slot)) {
            timeSlotOffer.time_slot.forEach((slot) => {
              if (slot.from_time && slot.to_time) {
                timeEntries.push({
                  day: dayName,
                  start_time: parseScheduleHours(slot.from_time),
                  end_time: parseScheduleHours(slot.to_time),
                });
              }
            });
          } else if (timeSlotOffer.time_slot) {
            // Handle case where time_slot might be a single object (legacy format)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const slot = timeSlotOffer.time_slot as any;
            if (slot.from_time && slot.to_time) {
              timeEntries.push({
                day: dayName,
                start_time: parseScheduleHours(slot.from_time),
                end_time: parseScheduleHours(slot.to_time),
              });
            }
          }
        });
      });

      return {
        address: calendar.address,
        max_guests: calendar.max_guests,
        min_guests: calendar.min_guests,
        time: timeEntries,
      };
    });
    return a;
  };

  const getCountryAndCity = () => {
    const countryParam =
      offer.location_type === "App\\Models\\Country"
        ? offer.location_id
        : offer.location_parent_id;
    const country = countries.find((country) => country.id === countryParam);
    const city = cities.find((city) => city.id === offer.location_id);
    return { country: country?.name, city: city?.name };
  };

  if (loading) {
    return <Loader width="20px" height="20px" />;
  }

  if (!offer) {
    return (
      <button
        onClick={handleIsModalOpen}
        className="offer-detail__edit-btn"
        type="button"
      >
        <MdOutlineLibraryAdd />
        Crear oferta
      </button>
    );
  }

  const parsedCalendar = parseCalendar(offer.calendar);
  const { country, city } = getCountryAndCity();

  return (
    <OfferDetailPageStyled>
      <GoBackButton />
      <div className="offer-detail__heading">
        <h3 className="offer-detail__title">
          {offer.company}{" "}
          <span className={getTypesClassNames(offer, "offer-detail")}>
            ({offer.type})
          </span>
        </h3>
        <CompanySelector />
        {user.type === UserTypes.nomade && (
          <button
            onClick={handleIsModalOpen}
            className="offer-detail__edit-btn"
          >
            <FaEdit />
            Editar oferta
          </button>
        )}
      </div>
      <div className="details-container">
        <span className="offer-detail__description">
          <strong>País: </strong>
          {country}
        </span>
        {city ? (
          <span className="offer-detail__conditions">
            <strong>Ciudad:</strong> {city}
          </span>
        ) : null}
        <div className="images-container">
          {offer.images?.length > 0 &&
            offer.images.map((image) => (
              <ImageCustom
                key={image.url}
                alt="Imagen de la oferta"
                className="offer-detail__offer-img"
                height={200}
                width={250}
                image={image.url}
              />
            ))}
        </div>
      </div>
      <DashboardTable
        bodySections={[offer]}
        headerSections={headerOffers}
        pageName="offerDetail"
      />

      {offer?.calendar && (
        <>
          <h3>Direcciones</h3>

          <DashboardTable
            bodySections={getOfferWithDayTime(parsedCalendar)}
            headerSections={headerAddressOffers}
            pageName="offerDetail"
          />
        </>
      )}
      <ReusableModal
        children={
          <OffersForm
            offer={offer}
            onSubmit={handleModifyOffer}
            onCancel={setIsModalOpen}
          />
        }
        openModal={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type="offer"
      />
    </OfferDetailPageStyled>
  );
};

export default OfferDetailsPage;
