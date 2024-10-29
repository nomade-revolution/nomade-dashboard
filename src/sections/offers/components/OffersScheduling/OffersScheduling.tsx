import {
  ErrorMessage,
  Field,
  FieldConfig,
  FieldInputProps,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from "formik";
import { Company } from "modules/user/domain/User";
import {
  ACTIVITY_OFFER_ID,
  DELIVERY_OFFER_ID,
  LODGING_OFFER_ID,
  RESTAURANT_OFFER_ID,
} from "sections/offers/utils/offersCategories";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import OfferSchedulingStyled from "./OffersSchedulingStyled";
import OffersTimetable from "../OffersTimetable/OffersTimetable";
import {
  OfferableActivity,
  OfferableBrand,
  OfferableDelivery,
  OfferableLodging,
  OfferableRestaurant,
  TimeSlot,
} from "modules/offers/domain/Offer";

interface Props {
  category: number;
  errors: FormikErrors<
    | OfferableRestaurant
    | OfferableActivity
    | OfferableBrand
    | OfferableDelivery
    | OfferableLodging
  >;
  getFieldProps: <Value = FormikValues>(
    props: string | FieldConfig<Value>,
  ) => FieldInputProps<Value>;
  touched: FormikTouched<
    | OfferableRestaurant
    | OfferableActivity
    | OfferableBrand
    | OfferableDelivery
    | OfferableLodging
  >;
  company: Company;
  address: string;
  setAddress: (value: string) => void;
}

const OffersScheduling = ({
  category,
  getFieldProps,
  touched,
  errors,
  company,
  address,
  setAddress,
}: Props): React.ReactElement => {
  return (
    <OfferSchedulingStyled className="scheduling">
      {(category === RESTAURANT_OFFER_ID ||
        category === ACTIVITY_OFFER_ID ||
        category === LODGING_OFFER_ID) && (
        <div className="scheduling--restaurant">
          <h4>Configura los horarios</h4>
          <section className="scheduling__section">
            <div className="form-subsection">
              <label htmlFor="max_guests" className="form-subsection__label">
                Máximo de personas
              </label>
              <Field
                type="number"
                id="max_guests"
                className="form-subsection__field--small"
                aria-label="Máximo de personas"
                {...getFieldProps("max_guests")}
              />
              {(
                errors as
                  | OfferableRestaurant
                  | OfferableActivity
                  | OfferableLodging
              ).max_guests &&
                (
                  touched as
                    | OfferableRestaurant
                    | OfferableActivity
                    | OfferableLodging
                ).max_guests && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="max_guests"
                  />
                )}
            </div>
            <div className="form-subsection">
              <label htmlFor="min_guests" className="form-subsection__label">
                Mínimo de personas
              </label>
              <Field
                type="number"
                id="min_guests"
                className="form-subsection__field--small"
                aria-label="Mínimo de personas"
                {...getFieldProps("min_guests")}
              />
              {(
                errors as
                  | OfferableRestaurant
                  | OfferableActivity
                  | OfferableLodging
              ).min_guests &&
                (
                  touched as
                    | OfferableRestaurant
                    | OfferableActivity
                    | OfferableLodging
                ).min_guests && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="min_guests"
                  />
                )}
            </div>
          </section>
          <ReusableSelect
            label="Direcciones"
            options={[
              {
                id: company.address?.id,
                name: company.address?.address,
                value: company.address?.id,
              },
            ]}
            setValue={setAddress}
            value={address}
          />
        </div>
      )}
      {category === DELIVERY_OFFER_ID && (
        <div className="form-subsection">
          <label
            htmlFor="advance_notice_time"
            className="form-subsection__label"
          >
            Tiempo previo de aviso
          </label>
          <Field
            type="number"
            id="advance_notice_time"
            className="form-subsection__field--small"
            aria-label="Correo electrónico"
            {...getFieldProps("advance_notice_time")}
          />
          {(errors as OfferableDelivery).advance_notice_time &&
            (touched as OfferableDelivery).advance_notice_time && (
              <ErrorMessage
                className="form-subsection__error-message"
                component="span"
                name="advance_notice_time"
              />
            )}
        </div>
      )}
      <OffersTimetable
        category={category}
        errors={errors as FormikErrors<TimeSlot>}
        getFieldProps={getFieldProps}
        touched={touched as FormikTouched<TimeSlot>}
      />
    </OfferSchedulingStyled>
  );
};

export default OffersScheduling;
