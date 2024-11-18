import { ErrorMessage, Field, Formik } from "formik";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { Company } from "modules/user/domain/User";
import AddCommentFormStyled from "./AddCommentFormStyled";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";

interface AddCommentFormProps {
  company: Company;
}

const AddCommentForm = ({ company }: AddCommentFormProps) => {
  const { editCompanyCms } = useCompanyContext();
  const [initialState, setInitialState] = useState({
    comment: company.company_comments ?? "",
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const handleSubmitForm = async (values: { comment: string }) => {
    setIsFormSubmitted(true);

    const response = await editCompanyCms(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { comments: values.comment } as unknown as any,
      company.id,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((response as any).success) {
      setIsSuccess(true);
    }
    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 2000);
  };
  useEffect(() => {
    setInitialState({
      comment: company.company_comments ?? "",
    });
  }, [company]);
  return (
    <Formik initialValues={initialState} onSubmit={handleSubmitForm}>
      {({ errors, touched, handleSubmit, isSubmitting, getFieldProps }) => (
        <AddCommentFormStyled onSubmit={handleSubmit} className="login-form">
          <div className="form-section">
            <label htmlFor="email" className="login-form__label">
              Comentario
            </label>
            <Field
              type="text"
              id="comment"
              className="form-section__field"
              aria-label="comment"
              {...getFieldProps("comment")}
            />
            {errors.comment && touched.comment && (
              <ErrorMessage
                className="login-form__error-message"
                component="span"
                name="email"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={
              isSubmitting ||
              getFieldProps("comment").value === company.company_comments ||
              getFieldProps("comment").value === ""
            }
            className="login-form__submit"
          >
            Guardar comentario
          </button>

          {isSubmitting ? (
            <Loader width="20px" height="20px" />
          ) : !isSuccess && isFormSubmitted ? (
            <span className="login-form__error-message">
              Error al guardar el commentario
            </span>
          ) : isFormSubmitted && isSuccess ? (
            <Loader width="20px" height="20px" />
          ) : (
            <></>
          )}
        </AddCommentFormStyled>
      )}
    </Formik>
  );
};

export default AddCommentForm;
