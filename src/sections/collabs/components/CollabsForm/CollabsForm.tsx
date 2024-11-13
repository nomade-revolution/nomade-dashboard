import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import Loader from "sections/shared/components/Loader/Loader";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collabsRequestSchema, initialData } from "./utils/validations";
import { CollabsRequestStructure } from "modules/collabs/domain/Collabs";

const CompanyForm = (): React.ReactElement => {
  // const [formState, setFormState] = useState<{ company_plan_id: string }>({
  //   company_plan_id: "",
  // });

  const { isSuccess, isError, loading } = useCompanyContext();
  const navigate = useNavigate();

  // const handleFormStateChange = (field: string, value: string) => {
  //   setFormState((prevState) => ({ ...prevState, [field]: value }));
  // };

  const handleSubmitForm = async (
    values: CollabsRequestStructure,
    { setSubmitting }: FormikHelpers<CollabsRequestStructure>,
  ) => {
    setSubmitting(true);

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== "id") {
        const value = values[key as keyof CollabsRequestStructure];
        formData.append(key, value as string);
      }
    });

    if (isSuccess) {
      setTimeout(() => navigate(0), 2000);
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialData}
      validationSchema={collabsRequestSchema}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Collab</h3>

          <div className="form-subsection">
            <label htmlFor="offer_id" className="form-subsection__label">
              Oferta
            </label>
            <Field
              type="text"
              id="offer_id"
              className="form-subsection__field-large--company"
              aria-label="Oferta"
              {...getFieldProps("offer_id")}
            />

            {errors.offer_id && touched.offer_id && (
              <ErrorMessage
                className="form-subsection__error-message"
                component="span"
                name="offer_id"
              />
            )}
          </div>
          <div className="form-subsection">
            <label htmlFor="influencer_id" className="form-subsection__label">
              Influencer
            </label>
            <Field
              type="text"
              id="influencer_id"
              className="form-subsection__field-large--company"
              aria-label="Influencer"
              {...getFieldProps("influencer_id")}
            />

            {errors.influencer_id && touched.influencer_id && (
              <ErrorMessage
                className="form-subsection__error-message"
                component="span"
                name="influencer_id"
              />
            )}
          </div>

          <div className="form-subsection">
            <label htmlFor="comment" className="form-subsection__label">
              Comentario
            </label>
            <Field
              type="text"
              id="comment"
              className="form-subsection__field-textarea--company"
              aria-label="Comentario"
              as={"textarea"}
              {...getFieldProps("comments")}
            />
            {errors.comment && touched.comment && (
              <ErrorMessage
                className="form-subsection__error-message"
                component="span"
                name="comment"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={
              isSuccess
                ? "datasheet-form__success"
                : isError
                  ? "datasheet-form__error"
                  : "datasheet-form__submit"
            }
          >
            {isSubmitting || loading ? (
              <Loader width="20px" height="20px" />
            ) : isSuccess ? (
              "Collab creada"
            ) : isError ? (
              "Revisa los datos e intentalo de nuevo"
            ) : (
              "Crear collab"
            )}
          </button>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default CompanyForm;
