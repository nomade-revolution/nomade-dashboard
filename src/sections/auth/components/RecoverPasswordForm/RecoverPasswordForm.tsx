import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { recoverPasswordScheme } from "../validations/validations";
import { useState } from "react";
import Loader from "sections/shared/components/Loader/Loader";
import RecoverPasswordStyled from "./RecoverPasswordStyles";
import useRecoverForm from "sections/auth/hooks/useRecoverForm";
import { useNavigate } from "react-router-dom";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";

const initialState = {
  email: "",
};

const RecoverPasswordForm = (): React.ReactElement => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { sendForm } = useRecoverForm();
  const navigate = useNavigate();

  const handleSubmitForm = async (
    values: { email: string },
    { setSubmitting }: FormikHelpers<{ email: string }>,
  ) => {
    const response = await sendForm(values);
    setSubmitting(false);

    if (response) {
      setIsSuccess(true);
      setIsFormSubmitted(true);
      // Navigate to new password page with email
      setTimeout(() => {
        navigate(appPaths.new_password, { state: { email: values.email } });
      }, 2000);
    } else {
      setIsSuccess(false);
      setIsFormSubmitted(true);
      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 5000);
    }
  };
  return (
    <Formik
      initialValues={initialState}
      validationSchema={recoverPasswordScheme}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, isSubmitting, getFieldProps }) => (
        <RecoverPasswordStyled onSubmit={handleSubmit} className="login-form">
          <div className="form-section">
            <label htmlFor="email" className="login-form__label">
              Email
            </label>
            <Field
              type="email"
              id="email"
              className="form-section__field"
              aria-label="Email"
              {...getFieldProps("email")}
            />
            {errors.email && touched.email && (
              <ErrorMessage
                className="login-form__error-message"
                component="span"
                name="email"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="login-form__submit"
          >
            Enviar nueva contraseña
          </button>

          {isSubmitting ? (
            <Loader width="20px" height="20px" />
          ) : !isSuccess && isFormSubmitted ? (
            <span className="login-form__error-message">
              Credenciales inválidas
            </span>
          ) : isFormSubmitted && isSuccess ? (
            <span className="login-form__success-message">
              Email enviado correctamente
            </span>
          ) : (
            <></>
          )}
        </RecoverPasswordStyled>
      )}
    </Formik>
  );
};

export default RecoverPasswordForm;
