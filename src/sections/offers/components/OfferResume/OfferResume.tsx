import {
  OfferableRestaurant,
  OfferableActivity,
  OfferableLodging,
  OfferableDelivery,
  FullOffer,
} from "modules/offers/domain/Offer";
import { Company } from "modules/user/domain/User";
import { offersTimetable } from "sections/offers/utils/offersTimetable";
import OfferResumeStyled from "./OfferResumeStyled";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdLogin } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import {
  ACTIVITY_OFFER_ID,
  DELIVERY_OFFER_ID,
  LODGING_OFFER_ID,
  RESTAURANT_OFFER_ID,
} from "sections/offers/utils/offersCategories";

interface Props {
  offerResume:
    | OfferableRestaurant[]
    | OfferableActivity[]
    | OfferableDelivery[]
    | OfferableLodging[];

  company: Company;
  category: string;
  offer?: FullOffer;
}

const OfferResume = ({
  offerResume,
  company,
  category,
  offer,
}: Props): React.ReactElement => {
  const resume = Array.isArray(offerResume)
    ? offerResume
    : offerResume
      ? [offerResume]
      : Array.isArray(offer?.calendar)
        ? offer.calendar
        : offer?.calendar
          ? [offer.calendar]
          : [];

  return (
    <OfferResumeStyled className="offer-resume">
      <h4>Horarios</h4>
      {!offerResume ? (
        <span>No has configurado nada</span>
      ) : (
        resume?.map((schedule) => (
          <div className="offer-resume__content">
            {(+category === RESTAURANT_OFFER_ID ||
              +category === LODGING_OFFER_ID ||
              +category === ACTIVITY_OFFER_ID) && (
              <>
                <span className="offer-resume__text-icon">
                  <FaLocationDot color={"#AD6975"} />
                  {company.address?.address}
                </span>

                <div className="offer-resume__section-row">
                  <span>Max - </span>
                  <span className="offer-resume__text-icon">
                    {
                      (
                        schedule as
                          | OfferableRestaurant
                          | OfferableActivity
                          | OfferableLodging
                      )?.max_guests
                    }
                    <PiUsersThreeFill />
                  </span>
                </div>
                <div className="offer-resume__section-row">
                  <span>Min - </span>
                  <span className="offer-resume__text-icon">
                    {
                      (
                        schedule as
                          | OfferableRestaurant
                          | OfferableActivity
                          | OfferableLodging
                      )?.min_guests
                    }
                    <PiUsersThreeFill />
                  </span>
                </div>
              </>
            )}
            {+category === DELIVERY_OFFER_ID && (
              <div className="offer-resume__section-row">
                <div className="offer-resume__text-icon">
                  <FaClock color={"#8C9B6E"} />
                  <span>Tiempo previo de aviso - </span>
                </div>
                <span>
                  {(schedule as OfferableDelivery).advance_notice_time}
                </span>
                <span>minutos</span>
              </div>
            )}
            {(+category === RESTAURANT_OFFER_ID ||
              +category === LODGING_OFFER_ID ||
              +category === ACTIVITY_OFFER_ID ||
              +category === DELIVERY_OFFER_ID) &&
              (
                schedule as
                  | OfferableRestaurant
                  | OfferableActivity
                  | OfferableDelivery
              ).week?.map((day) => (
                <section
                  className="offer-resume__time time"
                  key={day.day_of_week + day.time_slot[0].from_time}
                >
                  <span className="offer-resume__text-bold">
                    {
                      offersTimetable.find(
                        (time) => time.day_number === day.day_of_week,
                      )?.name
                    }
                  </span>
                  <div className="time__shift">
                    <span className="offer-resume__text-bold">1er turno</span>
                    <div>
                      <span className="offer-resume__text-icon">
                        <MdLogin color={"green"} />
                        {day?.time_slot[0].from_time}h
                      </span>
                      <span className="offer-resume__text-icon">
                        <BiLogOut color="red" />
                        {day?.time_slot[0].to_time}h
                      </span>
                    </div>
                  </div>
                  <div className="time__shift">
                    <span className="offer-resume__text-bold">2o turno</span>
                    <div>
                      <span className="offer-resume__text-icon">
                        <MdLogin color={"green"} />{" "}
                        {day?.time_slot[1].from_time}
                      </span>
                      <span className="offer-resume__text-icon">
                        {" "}
                        <BiLogOut color="red" /> {day?.time_slot[1].to_time}
                      </span>
                    </div>
                  </div>
                </section>
              ))}
          </div>
        ))
      )}
    </OfferResumeStyled>
  );
};

export default OfferResume;
