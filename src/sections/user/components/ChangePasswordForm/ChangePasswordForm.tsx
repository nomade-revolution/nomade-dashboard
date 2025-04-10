import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import Loader from "sections/shared/components/Loader/Loader";
import changePasswordScheme from "./validations/changePasswordScheme";
import useChangePasswordForm from "sections/auth/hooks/useChangePasswordForm";
import ChangePasswordFormStyled from "./ChangePasswordFormStyled";
import useLogout from "@auth/hook/useLogout";

const initialState = {
  password: "",
  newPassword: "",
  repeatNewPassword: "",
};

const ChangePasswordForm = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const { sendForm } = useChangePasswordForm();
  const { isSuccess } = useAuthContext();
  const { handleLogout: logoutUser } = useLogout();

  const handleSubmitForm = async (
    values: {
      password: string;
      repeatNewPassword: string;
      newPassword: string;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      password: string;
      newPassword: string;
      repeatNewPassword: string;
    }>,
  ) => {
    const success = await sendForm(
      values.password,
      values.newPassword,
      values.repeatNewPassword,
    );
    setSubmitting(false);
    setIsFormSubmitted(true);
    setTimeout(() => {
      setIsFormSubmitted(false);
      if (success) logoutUser();
    }, 5000);
  };
  return (
    <Formik
      initialValues={initialState}
      validateScheme={changePasswordScheme}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, isSubmitting, getFieldProps }) => (
        <ChangePasswordFormStyled
          onSubmit={handleSubmit}
          className="login-form"
        >
          <div className="form-section">
            <label htmlFor="password" className="login-form__label">
              Contraseña Actual
            </label>
            <Field
              type="password"
              id="password"
              className="form-section__field"
              aria-label="password"
              {...getFieldProps("password")}
            />
            {errors.password && touched.password && (
              <ErrorMessage
                className="login-form__error-message"
                component="span"
                name="password"
              />
            )}
          </div>

          <div className="form-section">
            <label htmlFor="newPassword" className="login-form__label">
              Nueva Contraseña
            </label>
            <Field
              type="password"
              id="newPassword"
              className="form-section__field"
              aria-label="newPassword"
              {...getFieldProps("newPassword")}
            />
            {errors.newPassword && touched.newPassword && (
              <ErrorMessage
                className="login-form__error-message"
                component="span"
                name="newPassword"
              />
            )}
          </div>
          <div className="form-section">
            <label htmlFor="repeatNewPassword" className="login-form__label">
              Repite tu nueva contraseña
            </label>
            <Field
              type="password"
              id="repeatNewPassword"
              className="form-section__field"
              aria-label="repeatNewPassword"
              {...getFieldProps("repeatNewPassword")}
            />
            {errors.repeatNewPassword && touched.repeatNewPassword && (
              <ErrorMessage
                className="login-form__error-message"
                component="span"
                name="repeatNewPassword"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="login-form__submit"
          >
            Cambiar contraseña
          </button>
          <div>
            {!isSuccess && isSubmitting ? (
              <Loader width="20px" height="20px" />
            ) : !isSuccess && isFormSubmitted ? (
              <span className="login-form__error-message">
                Error al realizar la petición, comprueba los datos enviados
              </span>
            ) : isSuccess && isFormSubmitted ? (
              <span className="login-form__success-message">
                Contraseña cambiada correctamente
              </span>
            ) : (
              <></>
            )}
          </div>
        </ChangePasswordFormStyled>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
