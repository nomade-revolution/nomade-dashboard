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
import { RESTAURANT_OFFER_ID } from "sections/offers/utils/offersCategories";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import OfferSchedulingStyled from "./OffersSchedulingStyled";
import { offersTimetable } from "sections/offers/utils/offersTimetable";

interface Props {
  category: number;
  errors: FormikErrors<object>;
  getFieldProps: <Value = FormikValues>(
    props: string | FieldConfig<Value>,
  ) => FieldInputProps<Value>;
  touched: FormikTouched<object>;
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
      {category === RESTAURANT_OFFER_ID && (
        <div className="scheduling--restaurant">
          <h4>Configura los horarios</h4>
          <section className="scheduling__section">
            <div className="form-subsection">
              <label htmlFor="phone" className="form-subsection__label">
                Máximo de personas
              </label>
              <Field
                type="number"
                id="phone"
                className="form-subsection__field--small"
                aria-label="Correo electrónico"
                {...getFieldProps("phone")}
              />
              {errors && touched && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="email"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="phone" className="form-subsection__label">
                Mínimo de personas
              </label>
              <Field
                type="number"
                id="phone"
                className="form-subsection__field--small"
                aria-label="Correo electrónico"
                {...getFieldProps("phone")}
              />
              {errors && touched && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="email"
                />
              )}
            </div>
          </section>
          <ReusableSelect
            label="Direcciones"
            options={[
              {
                id: 1,
                name: company.address?.address,
                value: company.address?.address_id,
              },
            ]}
            setValue={setAddress}
            value={address}
          />
          <section>
            {offersTimetable.map((time) => (
              <div>{time.name}</div>
            ))}
          </section>
        </div>
      )}
    </OfferSchedulingStyled>
  );
};

export default OffersScheduling;
