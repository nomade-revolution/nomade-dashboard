/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export interface AddresTableData {
  address: string;
  max_guests: number;
  min_guests: number;
  time: { day: string; start_time: string; end_time: string }[];
}

const OfferDetailsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useAuthContext();
  const { id } = useParams();
  const { offer, loading, getOffer, modifyOffer } = useOffersContext();

  const handleIsModalOpen = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getOffer(+id!);
  }, [id, getOffer]);

  const getOfferWithDayTime = (calendars: Calendar[]): AddresTableData[] => {
    const a = calendars.map((calendar) => {
      return {
        address: calendar.address,
        max_guests: calendar.max_guests,
        min_guests: calendar.min_guests,
        time: calendar.week.map((week) => {
          return {
            day: week[0].day_name,
            //@ts-expect-error
            start_time: week[0].time_slot.from_time,
            //@ts-expect-error
            end_time: week[0].time_slot.to_time,
          };
        }),
      };
    });
    return a;
  };

  return (
    <>
      {loading ? (
        <Loader width="20px" height="20px" />
      ) : !offer ? (
        <>
          <button
            onClick={handleIsModalOpen}
            className="offer-detail__edit-btn"
            type="button"
          >
            <MdOutlineLibraryAdd />
            Crear oferta
          </button>
        </>
      ) : (
        <OfferDetailPageStyled>
          <GoBackButton />
          <div className="offer-detail__heading">
            <h3 className="offer-detail__title">
              {offer.company}{" "}
              <span className={getTypesClassNames(offer, "offer-detail")}>
                ( {offer.type} )
              </span>
            </h3>
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
          <div className="images-container">
            {offer.images?.length > 0 &&
              offer.images.map((image) => (
                <ImageCustom
                  key={image.alt}
                  alt="Imágen de la oferta"
                  className="offer-detail__offer-img"
                  height={200}
                  width={250}
                  image={image.url}
                />
              ))}
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
                bodySections={getOfferWithDayTime(offer.calendar as Calendar[])}
                headerSections={headerAddressOffers}
                pageName="offerDetail"
              />
            </>
          )}
          <ReusableModal
            children={
              <OffersForm
                offer={offer}
                onSubmit={modifyOffer}
                onCancel={setIsModalOpen}
              />
            }
            openModal={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            type="offer"
          />
        </OfferDetailPageStyled>
      )}
    </>
  );
};

export default OfferDetailsPage;
