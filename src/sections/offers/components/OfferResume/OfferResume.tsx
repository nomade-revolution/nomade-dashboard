import React, { Dispatch, SetStateAction } from "react";
import {
  OfferableRestaurant,
  OfferableActivity,
  OfferableLodging,
  OfferableDelivery,
  FullOffer,
  WeekDay,
  SelectedDay,
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
import { FaTrashAlt } from "react-icons/fa";
import { useFormikContext } from "formik";
import formatOfferScheduling from "sections/offers/utils/formatOfferScheduling";
import { Calendar } from "modules/offers/domain/OfferCalendar";
import useOffers from "sections/offers/hooks/useOffers";

interface Props {
  offerResume:
    | OfferableRestaurant[]
    | OfferableActivity[]
    | OfferableDelivery[]
    | OfferableLodging[];

  company: Company;
  category: string;
  offer?: FullOffer;
  onOfferResumeChange: (
    updatedResume:
      | OfferableRestaurant[]
      | OfferableLodging[]
      | OfferableActivity[]
      | OfferableDelivery
      | object,
  ) => void;
  setWeek: (value: WeekDay[]) => void;
  setSelectedDays: Dispatch<SetStateAction<SelectedDay[]>>;
  onSchedulingStateDelete: () => void;
  schedulingState: {
    restaurant: OfferableRestaurant[];
    delivery: OfferableDelivery;
    activity: OfferableActivity[];
    brand: object;
    lodging: OfferableLodging[];
  };
  setSchedulingState: Dispatch<
    SetStateAction<{
      restaurant: OfferableRestaurant[];
      delivery: OfferableDelivery;
      activity: OfferableActivity[];
      brand: object;
      lodging: OfferableLodging[];
    }>
  >;
  selectedIndex: number | null;
  setSelectedIndex: (value: number | null) => void;
}

const OfferResume = ({
  offerResume,
  company,
  category,
  offer,
  onOfferResumeChange,
  setSelectedDays,
  setWeek,
  onSchedulingStateDelete,
  schedulingState,
  setSchedulingState,
  selectedIndex,
  setSelectedIndex,
}: Props): React.ReactElement => {
  const { setFieldValue } = useFormikContext();
  const { getSchedulingStateField } = useOffers();

  const handleDelete = () => {
    onOfferResumeChange([]);
    onSchedulingStateDelete();
    setFieldValue("min_guests", 0);
    setFieldValue("max_guests", 0);
    setWeek([]);
    setSelectedDays([]);
  };

  const resume = Array.isArray(offerResume)
    ? offerResume
    : offerResume
      ? [offerResume]
      : Array.isArray(offer?.calendar)
        ? offer.calendar
        : offer?.calendar
          ? [offer.calendar]
          : [];

  const handleOnClick = (
    schedule: OfferableLodging | OfferableDelivery | Calendar,
    index: number,
  ) => {
    const schedulingField = getSchedulingStateField(schedulingState, category);

    const updatedSchedulingState = { ...schedulingState };

    const key = offer?.type.toLocaleLowerCase() as keyof typeof schedulingState;

    if (Array.isArray(schedulingField)) {
      updatedSchedulingState[key] = schedulingField.map((item, idx) =>
        idx === index ? schedule : item,
      ) as never;
    } else {
      updatedSchedulingState[key] = schedule as never;
    }

    setSchedulingState(updatedSchedulingState);

    setSelectedDays(
      formatOfferScheduling(updatedSchedulingState) as unknown as SelectedDay[],
    );

    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <OfferResumeStyled className="offer-resume">
      <div className="offer-resume__top-section">
        <h4>Horarios</h4>
        {((Array.isArray(offerResume) && offerResume.length > 0) ||
          (typeof offerResume === "object" &&
            Object.entries(offerResume).length > 0)) && (
          <button onClick={handleDelete} className="offer-resume__delete-btn">
            <FaTrashAlt color="red" />
            Borrar horarios
          </button>
        )}
      </div>
      {!offerResume || offerResume.length === 0 ? (
        <span>No has configurado nada</span>
      ) : (
        resume?.map((schedule, index) => (
          <button
            key={index}
            onClick={() => handleOnClick(schedule, index)}
            type="button"
            className={selectedIndex === index ? "selected" : ""}
          >
            <div className="offer-resume__content" key={index}>
              {(+category === RESTAURANT_OFFER_ID ||
                +category === LODGING_OFFER_ID ||
                +category === ACTIVITY_OFFER_ID) && (
                <>
                  <span className="offer-resume__text-icon">
                    <FaLocationDot color={"#AD6975"} />
                    {company.address?.address}
                  </span>

                  <div className="offer-resume__section-row">
                    <PiUsersThreeFill />
                    <span>Max - </span>
                    <span className="offer-resume__text-icon">
                      {
                        (
                          schedule as
                            | OfferableRestaurant
                            | OfferableActivity
                            | OfferableLodging
                        )?.max_guests
                      }{" "}
                    </span>
                  </div>
                  <div className="offer-resume__section-row">
                    <PiUsersThreeFill />

                    <span>Min - </span>
                    <span className="offer-resume__text-icon">
                      {
                        (
                          schedule as
                            | OfferableRestaurant
                            | OfferableActivity
                            | OfferableLodging
                        )?.min_guests
                      }{" "}
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
                    key={day.day_of_week + day.time_slot[0]?.from_time}
                  >
                    <span className="offer-resume__text-bold">
                      {offersTimetable.find(
                        (time) => time.day_number === day.day_of_week,
                      )?.name ?? day.day_name}
                    </span>
                    <div className="time__shift">
                      <span className="offer-resume__text-bold">1er turno</span>
                      <div>
                        <span className="offer-resume__text-icon">
                          <MdLogin color={"green"} />
                          {day?.time_slot[0]?.from_time}h
                        </span>
                        <span className="offer-resume__text-icon">
                          <BiLogOut color="red" />
                          {day?.time_slot[0]?.to_time}h
                        </span>
                      </div>
                    </div>
                    {day.time_slot[1] && (
                      <div className="time__shift">
                        <span className="offer-resume__text-bold">
                          2o turno
                        </span>
                        <div>
                          <span className="offer-resume__text-icon">
                            <MdLogin color={"green"} />{" "}
                            {day?.time_slot[1]?.from_time}
                          </span>
                          <span className="offer-resume__text-icon">
                            {" "}
                            <BiLogOut color="red" />{" "}
                            {day?.time_slot[1]?.to_time}
                          </span>
                        </div>
                      </div>
                    )}
                  </section>
                ))}
            </div>
          </button>
        ))
      )}
    </OfferResumeStyled>
  );
};

export default OfferResume;
