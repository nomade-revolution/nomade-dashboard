import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import ReusableSelect from "../ReusableSelect/ReusableSelect";
import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { useState } from "react";

import { Contact } from "modules/contact/domain/Contact";
import { contactSchema } from "./validations/validations";

interface Props {
  setContact: (value: Contact) => void;
  contact: Contact;
}

const initialState: Contact = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  type_id: 0,
};

const ContactForm = ({ setContact, contact }: Props): React.ReactElement => {
  const [country, setCountry] = useState<string>("");

  const handleSubmitForm = async (
    values: Contact,
    { setSubmitting }: FormikHelpers<Contact>,
  ) => {
    setSubmitting(true);
    setContact(values);
    setSubmitting(false);
  };

  const initialValues = {
    ...initialState,
    ...contact,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactSchema}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Dirección</h3>
          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label htmlFor="name" className="form-subsection__label">
                Nombre
              </label>
              <Field
                type="text"
                id="name"
                className="form-subsection__field"
                aria-label="Nombre del laboratorio"
                {...getFieldProps("name")}
              />
              {errors.name && touched.name && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="name"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="surname" className="form-subsection__label">
                Apellidos
              </label>
              <Field
                type="text"
                id="surname"
                className="form-subsection__field-large"
                aria-label="Alias"
                {...getFieldProps("surname")}
              />
              {errors.surname && touched.surname && (
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
                Teléfono
              </label>
              <Field
                type="phone"
                id="phone"
                className="form-subsection__field"
                aria-label="Correo electrónico"
                {...getFieldProps("phone")}
              />
              {errors.phone && touched.phone && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="email"
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
                aria-label="Teléfono de contacto"
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
          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label htmlFor="type_id" className="form-subsection__label">
                País
              </label>
              <ReusableSelect
                label="Seleccionar país"
                options={[]}
                setValue={setCountry}
                value={country}
              />
              {errors.type_id && touched.type_id && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="type_id"
                />
              )}
            </div>
          </section>

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

export default ContactForm;
