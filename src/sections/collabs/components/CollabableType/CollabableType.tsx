import {
  ErrorMessage,
  Field,
  FieldConfig,
  FieldInputProps,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from "formik";

import { Calendar, TimeSlotOffer } from "modules/offers/domain/OfferCalendar";
import { Value } from "react-calendar/src/shared/types.js";
import CustomCalendar from "sections/shared/components/CustomCalendar/CustomCalendar";
import { DefaultCollabableSectionStyled } from "./CollabableTypeStyled";
import {
  CollabCollabableCreateDefault,
  CollabCollabableCreateDelivery,
  CollabCollabableCreateLodging,
} from "modules/collabs/domain/Collabs";
import { FullOffer, OfferTypes } from "modules/offers/domain/Offer";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";

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
  selectedAddress: number | null;
  setSelectedAddress: (value: number) => void;
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
  selectedAddress,
  setSelectedAddress,
}: Props): React.ReactElement => {
  const handleButtonClick = (time: string) => {
    setSelectedTime(time);
  };

  let calendars: Calendar[] = [];

  if (offer?.calendar) {
    calendars = Array.isArray(offer.calendar)
      ? offer.calendar
      : [offer.calendar];
  }

  const offerType = offer.type;
  const currentCalendar = calendars.length
    ? calendars?.find((calendar) => calendar.address_id === selectedAddress)
    : null;

  return (
    <DefaultCollabableSectionStyled className="default-section">
      {offerType &&
        (offerType === OfferTypes.restaurant ||
          offerType === OfferTypes.lodging ||
          offerType === OfferTypes.activity) && (
          <>
            <div className="form-subsection">
              <label htmlFor="in_exchange" className="form-subsection__label">
                Dirección
              </label>
              <ReusableSelect
                label=""
                options={calendars.map((calendar) => ({
                  id: calendar.address_id,
                  name: calendar.address,
                  value: String(calendar.address_id),
                }))}
                setValue={(value) => {
                  setSelectedAddress(parseInt(value));
                }}
                value={String(currentCalendar?.address_id)}
              />
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
          selectRange={offerType === OfferTypes.lodging}
        />
      </div>
      {currentCalendar && offerType !== OfferTypes.lodging && (
        <>
          <div className="default-section__days-hours">
            <h4>Horas por día</h4>
            {currentCalendar &&
              currentCalendar?.week.map((week) => {
                const groupedDays: Record<string, string[]> = week.reduce(
                  (acc: Record<string, string[]>, day: TimeSlotOffer) => {
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
