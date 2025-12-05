import {
  FormikErrors,
  FormikValues,
  FieldConfig,
  FieldInputProps,
  FormikTouched,
  Field,
  ErrorMessage,
} from "formik";
import {
  FullOffer,
  OfferTypes,
  SelectedDay,
  TimeSlot,
  WeekDay,
} from "modules/offers/domain/Offer";
import { useEffect } from "react";

import { offersTimetable } from "sections/offers/utils/offersTimetable";
import CustomCheckbox from "sections/shared/components/CustomCheckbox/CustomCheckbox";

interface Props {
  type: OfferTypes | string;
  errors: FormikErrors<TimeSlot>;
  getFieldProps: <Value = FormikValues>(
    props: string | FieldConfig<Value>,
  ) => FieldInputProps<Value>;
  touched: FormikTouched<TimeSlot>;
  setWeek: (value: WeekDay[]) => void;
  selectedDays: SelectedDay[];
  setSelectedDays: React.Dispatch<React.SetStateAction<SelectedDay[]>>;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<unknown>>;
  offer: FullOffer;
}

const OffersTimetable = ({
  type,
  errors,
  getFieldProps,
  touched,
  setWeek,
  selectedDays,
  setSelectedDays,
  setFieldValue,
  offer,
}: Props): React.ReactElement => {
  const handleCheckboxChange = (selectedDay: (typeof offersTimetable)[0]) => {
    setSelectedDays((prevDays: SelectedDay[]) => {
      const isSelected = prevDays.some(
        (day) => day.day_number === selectedDay.day_number,
      );

      if (isSelected) {
        return prevDays.filter(
          (day) => day.day_number !== selectedDay.day_number,
        );
      } else {
        return [
          ...prevDays,
          {
            day_number: selectedDay.day_number,
            day_name: selectedDay.name,
            shifts: {
              firstShift: { from_time: "", to_time: "" },
              secondShift: { from_time: "", to_time: "" },
            },
          },
        ];
      }
    });
  };

  useEffect(() => {
    const updatedWeek = selectedDays?.reduce((acc: WeekDay[], day) => {
      // Normalize time format to HH:mm:ss as required by backend
      const normalizeTime = (time: string): string => {
        if (!time || time.trim() === "") return "";
        const cleaned = time.trim();
        const parts = cleaned.split(":");
        if (parts.length === 3) return cleaned;
        if (parts.length === 2) return `${cleaned}:00`;
        if (parts.length === 1 && parts[0]) return `${cleaned}:00:00`;
        return "";
      };

      const firstShiftFrom = normalizeTime(
        (getFieldProps(`from_time_day_${day.day_number}_1`)
          .value as unknown as string) || "",
      );
      const firstShiftTo = normalizeTime(
        (getFieldProps(`to_time_day_${day.day_number}_1`)
          .value as unknown as string) || "",
      );
      const secondShiftFrom = normalizeTime(
        (getFieldProps(`from_time_day_${day.day_number}_2`)
          .value as unknown as string) || "",
      );
      const secondShiftTo = normalizeTime(
        (getFieldProps(`to_time_day_${day.day_number}_2`)
          .value as unknown as string) || "",
      );

      // Build time_slot array - only include non-empty slots
      const timeSlot = [];
      if (firstShiftFrom && firstShiftTo) {
        timeSlot.push({
          from_time: firstShiftFrom,
          to_time: firstShiftTo,
        });
      }
      if (secondShiftFrom && secondShiftTo) {
        timeSlot.push({
          from_time: secondShiftFrom,
          to_time: secondShiftTo,
        });
      }

      if (!acc.some((entry: WeekDay) => entry.day_of_week === day.day_number)) {
        acc.push({
          day_name: day.day_name,
          day_of_week: day.day_number,
          // @ts-expect-error TODO: fix this
          time_slot: timeSlot,
        });
      }

      return acc;
    }, []);

    setWeek(updatedWeek);
  }, [getFieldProps, selectedDays, setWeek]);

  const offerType = offer?.type;
  useEffect(() => {
    if (
      offerType === OfferTypes.restaurant ||
      offerType === OfferTypes.activity ||
      offerType === OfferTypes.delivery
    ) {
      selectedDays?.forEach((day) => {
        if (day.shifts?.firstShift.from_time !== undefined) {
          setFieldValue(
            `from_time_day_${day.day_number}_1`,
            day.shifts.firstShift.from_time || 0,
          );
        }

        if (day.shifts?.firstShift.to_time !== undefined) {
          setFieldValue(
            `to_time_day_${day.day_number}_1`,
            day.shifts.firstShift.to_time || 0,
          );
        }

        if (day.shifts?.secondShift.from_time !== undefined) {
          setFieldValue(
            `from_time_day_${day.day_number}_2`,
            day.shifts.secondShift.from_time || 0,
          );
        }

        if (day.shifts?.secondShift.to_time !== undefined) {
          setFieldValue(
            `to_time_day_${day.day_number}_2`,
            day.shifts.secondShift.to_time || 0,
          );
        }
      });
    }
  }, [offerType, selectedDays, setFieldValue]);

  return (
    <section>
      {(type === OfferTypes.restaurant ||
        type === OfferTypes.activity ||
        type === OfferTypes.delivery) && (
        <div>
          <ul className="scheduling__list">
            {offersTimetable.map((time, index) => (
              <li key={time.id} className="scheduling__timetable">
                <section className="scheduling__timetable-check">
                  <CustomCheckbox
                    onChange={() => handleCheckboxChange(time)}
                    checked={selectedDays?.some(
                      (d) => d.day_number === time.day_number,
                    )}
                  />
                  {time.name}
                </section>
                <div className="scheduling__times">
                  <section className="scheduling__timetable-column">
                    {index === 0 && (
                      <h4 className="scheduling__title">Primer turno</h4>
                    )}
                    <div className="scheduling__timetable-time">
                      <div className="form-subsection">
                        <label
                          htmlFor={`from_time_day_${time.day_number}_1`}
                          className="form-subsection__label"
                        >
                          Entrada
                        </label>
                        <Field
                          type="time"
                          id={`from_time_day_${index + 1}_1`}
                          className="form-subsection__field--small-time"
                          aria-label="Entrada primer turno"
                          step="1800"
                          {...getFieldProps(
                            `from_time_day_${time.day_number}_1`,
                          )}
                        />
                        {errors.from_time && touched.from_time && (
                          <ErrorMessage
                            className="form-subsection__error-message"
                            component="span"
                            name={`from_time_day_${time.day_number}_1`}
                          />
                        )}
                      </div>

                      <div className="form-subsection">
                        <label
                          htmlFor={`to_time_day_${time.day_number}_1`}
                          className="form-subsection__label"
                        >
                          Salida
                        </label>
                        <Field
                          type="time"
                          id={`to_time_day_${time.day_number}_1`}
                          className="form-subsection__field--small-time"
                          aria-label="Salida primer turno"
                          step="1800"
                          {...getFieldProps(`to_time_day_${time.day_number}_1`)}
                        />
                        {errors.to_time && touched.to_time && (
                          <ErrorMessage
                            className="form-subsection__error-message"
                            component="span"
                            name={`to_time_day_${time.day_number}_1`}
                          />
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="scheduling__timetable-column">
                    {index === 0 && (
                      <h4 className="scheduling__title">Segundo turno</h4>
                    )}
                    <div className="scheduling__timetable-time">
                      <div className="form-subsection">
                        <label
                          htmlFor={`from_time_day_${time.day_number}_2`}
                          className="form-subsection__label"
                        >
                          Entrada
                        </label>
                        <Field
                          type="time"
                          id={`from_time_day_${time.day_number}_2`}
                          className="form-subsection__field--small-time"
                          aria-label="Entrada segundo turno"
                          step="1800"
                          {...getFieldProps(
                            `from_time_day_${time.day_number}_2`,
                          )}
                        />
                        {errors.from_time && touched.from_time && (
                          <ErrorMessage
                            className="form-subsection__error-message"
                            component="span"
                            name={`from_time_day_${time.day_number}_2`}
                          />
                        )}
                      </div>

                      <div className="form-subsection">
                        <label
                          htmlFor={`to_time_day_${time.day_number}_2`}
                          className="form-subsection__label"
                        >
                          Salida
                        </label>
                        <Field
                          type="time"
                          id={`to_time_day_${time.day_number}_2`}
                          className="form-subsection__field--small-time"
                          step="1800"
                          aria-label="Salida segundo turno"
                          {...getFieldProps(`to_time_day_${time.day_number}_2`)}
                        />
                        {errors.to_time && touched.to_time && (
                          <ErrorMessage
                            className="form-subsection__error-message"
                            component="span"
                            name={`to_time_day_${index + 1}_2`}
                          />
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default OffersTimetable;
