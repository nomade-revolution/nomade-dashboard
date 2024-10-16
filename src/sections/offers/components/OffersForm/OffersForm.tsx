import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { OfferFormStructure } from "modules/offers/domain/Offer";
import { initialValues, offerSchema } from "./utils/validations";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";

const OffersForm = (): React.ReactElement => {
  const handleSubmitForm = async (
    values: OfferFormStructure,
    { setSubmitting }: FormikHelpers<OfferFormStructure>,
  ) => {
    setSubmitting(true);

    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={offerSchema}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Oferta</h3>
          <div className="datasheet-form__content">
            <section className="datasheet-form__section">
              <div className="form-subsection">
                <label htmlFor="name" className="form-subsection__label">
                  Descripción
                </label>
                <Field
                  type="text"
                  id="name"
                  className="form-subsection__field-textarea--offer"
                  aria-label="Nombre del laboratorio"
                  as={"textarea"}
                  {...getFieldProps("name")}
                />
                {errors.description && touched.description && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="name"
                  />
                )}
              </div>
              <div className="form-subsection">
                <label htmlFor="surname" className="form-subsection__label">
                  Condiciones
                </label>
                <Field
                  type="text"
                  id="surname"
                  className="form-subsection__field-textarea--offer"
                  aria-label="Alias"
                  as={"textarea"}
                  {...getFieldProps("surname")}
                />
                {errors.conditions && touched.conditions && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="surname"
                  />
                )}
              </div>
            </section>
            <section className="datasheet-form__section">
              <div className="form-subsection">
                <label htmlFor="phone" className="form-subsection__label">
                  A cambio
                </label>
                <Field
                  type="phone"
                  id="phone"
                  as={"textarea"}
                  className="form-subsection__field-textarea--offer"
                  aria-label="Correo electrónico"
                  {...getFieldProps("phone")}
                />
                {errors.in_exchange && touched.in_exchange && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="email"
                  />
                )}
              </div>
              <div className="form-subsection">
                <label htmlFor="email" className="form-subsection__label">
                  Categoría
                </label>
                <ReusableSelect
                  label="Categorías"
                  options={[]}
                  setValue={() => {}}
                  value=""
                />
                {errors.offer_category_id && touched.offer_category_id && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="email"
                  />
                )}
              </div>
            </section>
            <section className="datasheet-form__section">
              <div className="form-subsection">
                <label htmlFor="type_id" className="form-subsection__label">
                  Dirección
                </label>
                <ReusableSelect
                  label="Direcciones"
                  options={[]}
                  setValue={() => {}}
                  value=""
                />
                {errors.location_id && touched.location_id && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="type_id"
                  />
                )}
              </div>
              <div className="form-subsection">
                <label htmlFor="type_id" className="form-subsection__label">
                  Ciudad
                </label>
                <ReusableSelect
                  label="Ciudad"
                  options={[]}
                  setValue={() => {}}
                  value=""
                />
                {errors.location_id && touched.location_id && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="type_id"
                  />
                )}
              </div>
            </section>
          </div>

          <button
            type="submit"
            className="datasheet-form__submit"
            disabled={isSubmitting}
          >
            Guardar
          </button>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default OffersForm;
