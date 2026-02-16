import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";
import { CreateLeadPayload } from "modules/leads/domain/LeadsRepository";

interface FormValues {
  company_name: string;
  contact_name: string;
  prefix: string;
  phone: string;
  email: string;
}

const initialValues: FormValues = {
  company_name: "",
  contact_name: "",
  prefix: "34",
  phone: "",
  email: "",
};

const createLeadSchema = yup.object({
  company_name: yup.string().required("Campo requerido"),
  contact_name: yup.string().required("Campo requerido"),
  prefix: yup.string().required("Campo requerido"),
  phone: yup.string().required("Campo requerido"),
  email: yup
    .string()
    .email("Formato de email incorrecto")
    .required("Campo requerido"),
});

interface Props {
  onSuccess?: () => void;
}

const CreateLeadForm = ({ onSuccess }: Props): React.ReactElement => {
  const { createLead } = useLeadsContext();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    const prefixValue = values.prefix.trim().startsWith("+")
      ? values.prefix.trim()
      : `+${values.prefix.trim()}`;

    const payload: CreateLeadPayload = {
      company_name: values.company_name,
      contact_name: values.contact_name,
      prefix: prefixValue,
      phone: values.phone,
      email: values.email,
      created_in_cms: true,
    };

    const response = await createLead(payload);
    setSubmitting(false);
    if (response?.success) {
      onSuccess?.();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createLeadSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled
          onSubmit={handleSubmit}
          className="datasheet-form"
          $isMultiple={false}
        >
          <h3>Nuevo lead</h3>
          <div className="lead-form__section">
            <div className="form-subsection">
              <label htmlFor="company_name" className="form-subsection__label">
                Nombre de empresa *
              </label>
              <Field
                type="text"
                id="company_name"
                className="lead-form__field"
                aria-label="Nombre de empresa"
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
              <label htmlFor="contact_name" className="form-subsection__label">
                Persona de contacto *
              </label>
              <Field
                type="text"
                id="contact_name"
                className="lead-form__field"
                aria-label="Persona de contacto"
                {...getFieldProps("contact_name")}
              />
              {errors.contact_name && touched.contact_name && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="contact_name"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="prefix" className="form-subsection__label">
                Prefijo *
              </label>
              <Field
                type="text"
                id="prefix"
                className="lead-form__field"
                aria-label="Prefijo telefónico"
                placeholder="+34"
                {...getFieldProps("prefix")}
              />
              {errors.prefix && touched.prefix && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="prefix"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="phone" className="form-subsection__label">
                Teléfono *
              </label>
              <Field
                type="text"
                id="phone"
                className="lead-form__field"
                aria-label="Teléfono"
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
                Correo electrónico *
              </label>
              <Field
                type="email"
                id="email"
                className="lead-form__field"
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
            <section className="datasheet-form__footer">
              <button
                type="submit"
                className="datasheet-form__submit"
                disabled={isSubmitting}
              >
                Enviar
              </button>
            </section>
          </div>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default CreateLeadForm;
