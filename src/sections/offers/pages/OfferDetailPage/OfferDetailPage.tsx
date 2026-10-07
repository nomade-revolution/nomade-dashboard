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
import SimpleCardMobile from "sections/shared/components/SimpleCardMobile/SimpleCardMobile";

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
  const { user, selectedCompany } = useAuthContext();
  const { id } = useParams();
  const {
    offer,
    loading,
    getOffer,
    modifyOffer,
    offers,
    createNewOffer,
    pagination,
  } = useOffersContext();
  const { getAllCountries, countries } = useCountryContext();
  const { cities, getAllCities } = useCitiesContext();
  const navigate = useNavigate();

  const isCompany = user.type === UserTypes.company;

  useEffect(() => {
    getAllCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!offer || !offer.location_parent_id) return;
    const filters: FilterParams = {
      country_id: offer.location_parent_id,
    };
    getAllCities(filters);
  }, [offer, offer.location_parent_id, getAllCities]);

  useEffect(() => {
    if (!isCompany) return;
    if (!offers[0]?.id) return;
    const urlMatchesOffer = offers.some((item) => item.id?.toString() === id);
    if (!urlMatchesOffer) {
      navigate(`/oferta/${offers[0].id}`);
    }
  }, [isCompany, offers, id, navigate]);

  useEffect(() => {
    if (!id || id === "0" || !user?.type) return;
    if (isCompany) return;
    if (id === offer?.id?.toString()) return;
    getOffer(+id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user?.type, isCompany, getOffer]);

  useEffect(() => {
    if (!isCompany) return;
    if (!id || id === "0") return;
    if (pagination?.current_page == null) return;
    const allowed = offers.some((item) => item.id?.toString() === id);
    if (!allowed) return;
    if (id === offer?.id?.toString()) return;
    getOffer(+id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompany, id, offers, pagination?.current_page, getOffer]);

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

  const handleCreateNewOffer = async (formData: FormData) => {
    const res = await createNewOffer(formData);
    if (isHttpSuccessResponse(res)) {
      setIsModalOpen(false);
      const createdId = res.data?.data?.id;
      if (createdId) {
        navigate(`/oferta/${createdId}`);
      }
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
    const city =
      offer.location_type === "App\\Models\\City"
        ? cities.find(
            (city) =>
              city.id === offer.location_id &&
              (city.country_id == null ||
                city.country_id === offer.location_parent_id),
          )
        : undefined;
    return { country: country?.name, city: city?.name };
  };

  const companyOffersReady = pagination?.current_page != null;
  const companyOfferMatchesUrl = offers.some(
    (item) => item.id?.toString() === id,
  );

  const companyEmptyOffers = (
    <OfferDetailPageStyled>
      <div className="offer-detail__empty-state">
        <p className="offer-detail__empty">No tienes ninguna oferta activa</p>
        <CompanySelector />
      </div>
    </OfferDetailPageStyled>
  );

  const waitingForCompanyOffers =
    isCompany &&
    !companyOffersReady &&
    (Boolean(selectedCompany) || (user.companies?.length ?? 0) > 0);

  if (!user?.type || loading || waitingForCompanyOffers) {
    return <Loader width="20px" height="20px" />;
  }

  if (isCompany && offers.length === 0) {
    return companyEmptyOffers;
  }

  if (isCompany && !companyOfferMatchesUrl) {
    return <Loader width="20px" height="20px" />;
  }

  if (isCompany && offer?.id != null && offer.id.toString() !== id) {
    return <Loader width="20px" height="20px" />;
  }

  if (!offer) {
    if (isCompany) {
      return companyEmptyOffers;
    }

    return (
      <OfferDetailPageStyled>
        <button
          onClick={handleIsModalOpen}
          className="offer-detail__edit-btn"
          type="button"
        >
          <MdOutlineLibraryAdd />
          Crear oferta
        </button>
        <ReusableModal
          children={
            <OffersForm
              onSubmit={handleCreateNewOffer}
              onCancel={setIsModalOpen}
            />
          }
          openModal={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          type="offer"
        />
      </OfferDetailPageStyled>
    );
  }

  const parsedCalendar = parseCalendar(offer.calendar);
  const { country, city } = getCountryAndCity();

  return (
    <OfferDetailPageStyled>
      <div className="offer-detail__goback-wrap">
        <GoBackButton />
      </div>
      <div className="offer-detail__heading">
        <h3 className="offer-detail__title">
          {offer.company}{" "}
          <span className={getTypesClassNames(offer, "offer-detail")}>
            ({offer.type})
          </span>
        </h3>
        {isCompany &&
        (offers.length >= 2 || (user.companies?.length ?? 0) >= 2) ? (
          <div className="offer-detail__heading-aside">
            {offers.length >= 2 && (
              <div className="offer-detail__type-tabs" role="tablist">
                {offers.map((item) => {
                  const isActive = item.id?.toString() === id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`${getTypesClassNames(
                        item,
                        "offer-detail",
                      )} offer-detail__type-tab${
                        isActive ? " offer-detail__type-tab--active" : ""
                      }`}
                      onClick={() => {
                        if (item.id == null || isActive) return;
                        navigate(`/oferta/${item.id}`);
                      }}
                    >
                      {item.type}
                    </button>
                  );
                })}
              </div>
            )}
            <CompanySelector />
          </div>
        ) : (
          <CompanySelector />
        )}
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
        <div className="offer-detail__location-card">
          <span className="offer-detail__description">
            <strong>País: </strong>
            {country}
          </span>
          {city ? (
            <span className="offer-detail__conditions">
              <strong>Ciudad:</strong> {city}
            </span>
          ) : null}
        </div>
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
      <div className="offer-detail__description-section-desktop">
        <DashboardTable
          bodySections={[offer]}
          headerSections={headerOffers}
          pageName="offerDetail"
        />
      </div>
      <div className="offer-detail__description-section-mobile">
        <SimpleCardMobile
          bodySection={offer}
          headerSections={headerOffers}
          pageName="offerDetail"
        />
      </div>

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
