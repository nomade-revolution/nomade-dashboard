import {
  ErrorMessage,
  Field,
  FieldConfig,
  FieldInputProps,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from "formik";

import { Calendar, TimeSlot } from "modules/offers/domain/OfferCalendar";
import { Value } from "react-calendar/src/shared/types.js";
import {
  ACTIVITY_OFFER_ID,
  LODGING_OFFER_ID,
  RESTAURANT_OFFER_ID,
} from "sections/offers/utils/offersCategories";
import CustomCalendar from "sections/shared/components/CustomCalendar/CustomCalendar";
import { DefaultCollabableSectionStyled } from "./CollabableTypeStyled";
import {
  CollabCollabableCreateDefault,
  CollabCollabableCreateDelivery,
  CollabCollabableCreateLodging,
} from "modules/collabs/domain/Collabs";
import { FullOffer } from "modules/offers/domain/Offer";

interface Props {
  errors: FormikErrors<
    | CollabCollabableCreateDefault
    | CollabCollabableCreateDelivery
    | CollabCollabableCreateLodging
  >;
  getFieldProps: <Value = FormikValues>(
    props: string | FieldConfig<Value>,
  ) => FieldInputProps<Value>;
  touched: FormikTouched<
    | CollabCollabableCreateDefault
    | CollabCollabableCreateDelivery
    | CollabCollabableCreateLodging
  >;
  offer: FullOffer;
  valueDate: Value;
  onChangeDate: (value: Value) => void;
  setSelectedTime: (value: string) => void;
  selectedTime: string | null;
}

const CollabableType = ({
  errors,
  getFieldProps,
  offer,
  touched,
  onChangeDate,
  valueDate,
  setSelectedTime,
  selectedTime,
}: Props): React.ReactElement => {
  const handleButtonClick = (time: string) => {
    setSelectedTime(time);
  };

  const calendar: Calendar | Calendar[] = Array.isArray(offer.calendar)
    ? (offer.calendar[0] as Calendar)
    : (offer.calendar as Calendar);

  return (
    <DefaultCollabableSectionStyled className="default-section">
      {offer?.offer_category_id &&
        (offer.offer_category_id === RESTAURANT_OFFER_ID ||
          offer.offer_category_id === LODGING_OFFER_ID ||
          offer.offer_category_id === ACTIVITY_OFFER_ID) && (
          <>
            <div className="form-subsection">
              <label htmlFor="in_exchange" className="form-subsection__label">
                Dirección
              </label>
              {(offer?.calendar as Calendar[])?.[0]?.address ||
                (offer.addresses && (
                  <Field
                    type="text"
                    id="guests"
                    className="form-subsection__field"
                    aria-label="Correo electrónico"
                    value={
                      offer.offer_category_id === RESTAURANT_OFFER_ID
                        ? (offer.calendar as Calendar[])[0].address
                        : offer.addresses[0].address
                    }
                    readOnly
                  />
                ))}
            </div>
            <div className="form-subsection">
              <label htmlFor="guests" className="form-subsection__label">
                Número de personas
              </label>
              <Field
                type="number"
                id="guests"
                className="form-subsection__field"
                aria-label="Correo electrónico"
                {...getFieldProps("guests")}
              />
              {(errors as CollabCollabableCreateDefault).guests &&
                (touched as unknown as CollabCollabableCreateDefault)
                  .guests && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="guests"
                  />
                )}
            </div>
          </>
        )}

      <div>
        <h4>Escoger días</h4>
        <CustomCalendar
          onChange={onChangeDate}
          value={valueDate}
          selectRange={offer.offer_category_id === LODGING_OFFER_ID}
        />
      </div>
      {offer?.calendar && (
        <>
          <div className="default-section__days-hours">
            <h4>Horas por día</h4>
            {offer.calendar &&
              calendar?.week.map((week) => {
                const groupedDays: Record<string, string[]> = week.reduce(
                  (acc: Record<string, string[]>, day: TimeSlot) => {
                    if (!acc[day.day_name]) {
                      acc[day.day_name] = [];
                    }
                    acc[day.day_name].push(...day.time_slots);
                    return acc;
                  },
                  {},
                );

                return Object.entries(groupedDays).map(
                  ([dayName, timeSlots]) => (
                    <div key={dayName} className="default-section__timeslot">
                      <span className="default-section__text-bold">
                        {dayName}
                      </span>
                      <div className="default-section__time-btns">
                        {timeSlots.map((time, index) => (
                          <button
                            key={index}
                            className={`default-section__time-btn ${
                              selectedTime === time ? "selected" : ""
                            }`}
                            onClick={() => handleButtonClick(time)}
                            type="button"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ),
                );
              })}
          </div>
        </>
      )}
    </DefaultCollabableSectionStyled>
  );
};

export default CollabableType;
