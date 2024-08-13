import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { leadsScheme } from "./validations/validations";
import { CompanyRegisterStructure } from "modules/user/domain/User";
import LeadsFormStyled from "./LeadsFormStyled";
import { FullAddress } from "modules/address/domain/Address";

interface Props {
  lead: CompanyRegisterStructure;
  hash: string;
}

const initialState: CompanyRegisterStructure = {
  address: {} as FullAddress,
  company: "",
  company_name: "",
  description: "",
  email: "",
  hash: "",
  image: "",
  nif: "",
  password: "",
  password_confirmation: "",
  phone: "",
  web: "",
};

const LeadsForm = ({ lead, hash }: Props): React.ReactElement => {
  const handleSubmitForm = async (
    values: CompanyRegisterStructure,
    { setSubmitting }: FormikHelpers<CompanyRegisterStructure>,
  ) => {
    setSubmitting(false);
    values;
  };

  const initialValues = {
    ...initialState,
    ...lead,
    hash,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={leadsScheme}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, getFieldProps }) => (
        <LeadsFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Alta cliente</h3>
          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label htmlFor="company_name" className="form-subsection__label">
                Nombre de la empresa
              </label>
              <Field
                type="text"
                id="company_name"
                className="form-subsection__field-large"
                aria-label="Nombre del laboratorio"
                {...getFieldProps("company_name")}
              />
              {errors.company_name && touched.company_name && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="company_name"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="company" className="form-subsection__label">
                Empresa
              </label>
              <Field
                type="text"
                id="company"
                className="form-subsection__field-large"
                aria-label="Alias"
                {...getFieldProps("company")}
              />
              {errors.company && touched.company && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="company"
                />
              )}
            </div>
          </section>
          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label htmlFor="web" className="form-subsection__label">
                Web
              </label>
              <Field
                type="text"
                id="web"
                className="form-subsection__field-large"
                aria-label="Razón social"
                {...getFieldProps("web")}
              />
              {errors.web && touched.web && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="web"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="nif" className="form-subsection__label">
                NIF
              </label>
              <Field
                type="text"
                id="nif"
                className="form-subsection__field-large"
                aria-label="nif"
                {...getFieldProps("nif")}
              />
              {errors.nif && touched.nif && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="nif"
                />
              )}
            </div>
          </section>
          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label htmlFor="phone" className="form-subsection__label">
                Teléfono
              </label>
              <Field
                type="text"
                id="phone"
                className="form-subsection__field-large"
                aria-label="Teléfono de contacto"
                {...getFieldProps("phone")}
              />
              {errors.phone && touched.phone && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="phone"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="email" className="form-subsection__label">
                Email
              </label>
              <Field
                type="email"
                id="email"
                className="form-subsection__field-large"
                aria-label="Correo electrónico"
                {...getFieldProps("email")}
              />
              {errors.email && touched.email && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="email"
                />
              )}
            </div>
          </section>
          <section className="datasheet-form__section"></section>
          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label htmlFor="description" className="form-subsection__label">
                Descripción
              </label>
              <Field
                as="textarea"
                id="description"
                className="form-subsection__field-textarea"
                aria-label="Comentarios"
                maxlength="1000"
                {...getFieldProps("description")}
              />
              {errors.description && touched.description && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="description"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="description" className="form-subsection__label">
                Imágen
              </label>
              <Field
                type="file"
                id="description"
                className="form-subsection__field-image"
                aria-label="Comentarios"
                maxlength="1000"
                {...getFieldProps("description")}
              />
              {errors.description && touched.description && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="description"
                />
              )}
            </div>
          </section>
          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label htmlFor="password" className="form-subsection__label">
                Contraseña
              </label>
              <Field
                type="password"
                id="password"
                className="form-subsection__field-large"
                aria-label="Comentarios"
                {...getFieldProps("password")}
              />
              {errors.password && touched.password && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="password"
                />
              )}
            </div>
            <div className="form-subsection">
              <label
                htmlFor="password_confirmation"
                className="form-subsection__label"
              >
                Repite contraseña
              </label>
              <Field
                type="password"
                id="password_confirmation"
                className="form-subsection__field-large"
                aria-label="Comentarios"
                {...getFieldProps("password_confirmation")}
              />
              {errors.password_confirmation &&
                touched.password_confirmation && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="password_confirmation"
                  />
                )}
            </div>
            <Field
              type="hidden"
              id="hash"
              name="hash"
              className="form-subsection__field-large"
              aria-label="Comentarios"
              value={hash}
            />
          </section>
          <button type="submit" className="datasheet-form__submit">
            Enviar
          </button>
        </LeadsFormStyled>
      )}
    </Formik>
  );
};

export default LeadsForm;
