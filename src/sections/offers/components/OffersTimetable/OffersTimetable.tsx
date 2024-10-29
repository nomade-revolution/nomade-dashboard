import {
  FormikErrors,
  FormikValues,
  FieldConfig,
  FieldInputProps,
  FormikTouched,
  Field,
  ErrorMessage,
} from "formik";
import { TimeSlot } from "modules/offers/domain/Offer";

import {
  RESTAURANT_OFFER_ID,
  ACTIVITY_OFFER_ID,
  DELIVERY_OFFER_ID,
} from "sections/offers/utils/offersCategories";
import { offersTimetable } from "sections/offers/utils/offersTimetable";
import CustomCheckbox from "sections/shared/components/CustomCheckbox/CustomCheckbox";

interface Props {
  category: number;
  errors: FormikErrors<TimeSlot>;
  getFieldProps: <Value = FormikValues>(
    props: string | FieldConfig<Value>,
  ) => FieldInputProps<Value>;
  touched: FormikTouched<TimeSlot>;
}

const OffersTimetable = ({
  category,
  errors,
  getFieldProps,
  touched,
}: Props): React.ReactElement => {
  return (
    <section>
      {(category === RESTAURANT_OFFER_ID ||
        category === ACTIVITY_OFFER_ID ||
        category === DELIVERY_OFFER_ID) && (
        <div>
          <ul className="scheduling__list">
            {offersTimetable.map((time, index) => (
              <li key={time.id} className="scheduling__timetable">
                <section className="scheduling__timetable-check">
                  <CustomCheckbox />
                  {time.name}
                </section>

                <section className="scheduling__timetable-column">
                  {index === 0 && <h4>Primer turno</h4>}
                  <div className="scheduling__timetable-time">
                    <div className="form-subsection">
                      <label
                        htmlFor={`from_time_day_${index + 1}_1`}
                        className="form-subsection__label"
                      >
                        Entrada
                      </label>
                      <Field
                        type="time"
                        id={`from_time_day_${index + 1}_1`}
                        className="form-subsection__field--small-time"
                        aria-label="Entrada primer turno"
                        {...getFieldProps(`from_time_day_${index + 1}_1`)}
                      />
                      {errors.from_time && touched.from_time && (
                        <ErrorMessage
                          className="form-subsection__error-message"
                          component="span"
                          name={`from_time_day_${index + 1}_1`}
                        />
                      )}
                    </div>

                    <div className="form-subsection">
                      <label
                        htmlFor={`to_time_day_${index + 1}_1`}
                        className="form-subsection__label"
                      >
                        Salida
                      </label>
                      <Field
                        type="time"
                        id={`to_time_day_${index + 1}_1`}
                        className="form-subsection__field--small-time"
                        aria-label="Salida primer turno"
                        {...getFieldProps(`to_time_day_${index + 1}_1`)}
                      />
                      {errors.to_time && touched.to_time && (
                        <ErrorMessage
                          className="form-subsection__error-message"
                          component="span"
                          name={`to_time_day_${index + 1}_1`}
                        />
                      )}
                    </div>
                  </div>
                </section>

                <section className="scheduling__timetable-column">
                  {index === 0 && <h4>Segundo turno</h4>}
                  <div className="scheduling__timetable-time">
                    <div className="form-subsection">
                      <label
                        htmlFor={`from_time_day_${index + 1}_2`}
                        className="form-subsection__label"
                      >
                        Entrada
                      </label>
                      <Field
                        type="time"
                        id={`from_time_day_${index + 1}_2`}
                        className="form-subsection__field--small-time"
                        aria-label="Entrada segundo turno"
                        {...getFieldProps(`from_time_day_${index + 1}_2`)}
                      />
                      {errors.from_time && touched.from_time && (
                        <ErrorMessage
                          className="form-subsection__error-message"
                          component="span"
                          name={`from_time_day_${index + 1}_2`}
                        />
                      )}
                    </div>

                    <div className="form-subsection">
                      <label
                        htmlFor={`to_time_day_${index + 1}_2`}
                        className="form-subsection__label"
                      >
                        Salida
                      </label>
                      <Field
                        type="time"
                        id={`to_time_day_${index + 1}_2`}
                        className="form-subsection__field--small-time"
                        aria-label="Salida segundo turno"
                        {...getFieldProps(`to_time_day_${index + 1}_2`)}
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default OffersTimetable;
