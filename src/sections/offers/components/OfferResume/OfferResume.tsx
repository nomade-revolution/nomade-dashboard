import React, { Dispatch, SetStateAction } from "react";
import {
  OfferableRestaurant,
  OfferableActivity,
  OfferableLodging,
  OfferableDelivery,
  FullOffer,
  WeekDay,
  SelectedDay,
  OfferTypes,
} from "modules/offers/domain/Offer";
import { Company } from "modules/user/domain/User";
import { offersTimetable } from "sections/offers/utils/offersTimetable";
import OfferResumeStyled from "./OfferResumeStyled";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdLogin } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { useFormikContext } from "formik";
import formatOfferScheduling from "sections/offers/utils/formatOfferScheduling";
import { Calendar } from "modules/offers/domain/OfferCalendar";
import useOffers from "sections/offers/hooks/useOffers";
import { parseCalendar } from "sections/offers/pages/OfferDetailPage/OfferDetailPage";

interface Props {
  offerResume:
    | OfferableRestaurant[]
    | OfferableActivity[]
    | OfferableDelivery[]
    | OfferableLodging[];

  company: Company;
  type: OfferTypes | string;
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
  type,
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

  const handleOnClick = (
    schedule: OfferableLodging | OfferableDelivery | Calendar,
    index: number,
  ) => {
    const schedulingField = getSchedulingStateField(schedulingState, type);

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
      formatOfferScheduling(
        // @ts-expect-error TODO fix this
        updatedSchedulingState,
        key,
      ) as unknown as SelectedDay[],
    );

    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const getResume = () => {
    if (offer?.calendar) {
      return parseCalendar(offer.calendar);
    }

    if (offerResume) {
      if (Array.isArray(offerResume)) {
        return offerResume;
      }
      return [offerResume];
    }

    return [];
  };

  const resume = getResume();

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
      {!resume || resume.length === 0 ? (
        <span>No has configurado nada</span>
      ) : (
        resume?.map((schedule, index) => {
          return (
            <button
              key={index}
              onClick={() => handleOnClick(schedule, index)}
              type="button"
              className={selectedIndex === index ? "selected" : ""}
            >
              <div className="offer-resume__content" key={index}>
                {(type === OfferTypes.restaurant ||
                  type === OfferTypes.lodging ||
                  type === OfferTypes.activity) && (
                  <>
                    <span className="offer-resume__text-icon">
                      <FaLocationDot color={"#AD6975"} />
                      {(
                        schedule as
                          | OfferableRestaurant
                          | OfferableActivity
                          | OfferableLodging
                      ).address || ""}
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
                {type === OfferTypes.delivery && (
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
                {(type === OfferTypes.restaurant ||
                  type === OfferTypes.lodging ||
                  type === OfferTypes.activity ||
                  type === OfferTypes.delivery) &&
                  (
                    schedule as
                      | OfferableRestaurant
                      | OfferableActivity
                      | OfferableDelivery
                  ).week?.map((day) => {
                    if (!day.length) return null;

                    const firstTurn = day[0];
                    const secondTurn = day[1];
                    return (
                      <section
                        className="offer-resume__time time"
                        key={
                          firstTurn.day_of_week + firstTurn.time_slot?.from_time
                        }
                      >
                        <span className="offer-resume__text-bold">
                          {offersTimetable.find(
                            (time) => time.day_number === firstTurn.day_of_week,
                          )?.name ?? firstTurn.day_name}
                        </span>
                        <div className="time__shift">
                          <span className="offer-resume__text-bold">
                            1er turno
                          </span>
                          {firstTurn?.time_slot ? (
                            <div>
                              <span className="offer-resume__text-icon">
                                <MdLogin color={"green"} />
                                {firstTurn.time_slot.from_time}h
                              </span>
                              <span className="offer-resume__text-icon">
                                <BiLogOut color="red" />
                                {firstTurn.time_slot.to_time}h
                              </span>
                            </div>
                          ) : null}
                        </div>
                        {secondTurn && (
                          <div className="time__shift">
                            <span className="offer-resume__text-bold">
                              2o turno
                            </span>
                            {secondTurn?.time_slot ? (
                              <div>
                                <span className="offer-resume__text-icon">
                                  <MdLogin color={"green"} />{" "}
                                  {secondTurn?.time_slot?.from_time}
                                </span>
                                <span className="offer-resume__text-icon">
                                  {" "}
                                  <BiLogOut color="red" />{" "}
                                  {secondTurn?.time_slot?.to_time}
                                </span>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </section>
                    );
                  })}
              </div>
            </button>
          );
        })
      )}
    </OfferResumeStyled>
  );
};

export default OfferResume;
