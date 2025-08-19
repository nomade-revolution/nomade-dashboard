import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { newPasswordScheme } from "../validations/validations";
import { useState } from "react";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import Loader from "sections/shared/components/Loader/Loader";
import NewPasswordFormStyled from "./NewPasswordFormStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";

interface FormValues {
  code: string;
  password: string;
  password_confirmation: string;
}

const NewPasswordForm = (): React.ReactElement => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const { resetPassword } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Get email from location state (passed from recovery page)
  const email = location.state?.email as string;

  // Redirect if no email is provided
  if (!email) {
    navigate(appPaths.recovery_password);
    return <></>;
  }

  const initialState: FormValues = {
    code: "",
    password: "",
    password_confirmation: "",
  };

  const handleSubmitForm = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>,
  ) => {
    try {
      const response = await resetPassword(
        email,
        values.code,
        values.password,
        values.password_confirmation,
      );

      if (response) {
        setIsFormSubmitted(true);
        // Redirect to login after successful password reset
        setTimeout(() => {
          navigate(appPaths.login);
        }, 2000);
      } else {
        setErrors({ code: "Código inválido o expirado" });
      }
    } catch (error) {
      setErrors({ code: "Error al restablecer la contraseña" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={newPasswordScheme}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, isSubmitting, getFieldProps }) => (
        <NewPasswordFormStyled onSubmit={handleSubmit} className="login-form">
          <div className="form-section">
            <label htmlFor="code" className="login-form__label">
              Código de verificación
            </label>
            <Field
              type="text"
              id="code"
              className="form-section__field"
              aria-label="Código de verificación"
              placeholder="Ingresa el código enviado a tu email"
              {...getFieldProps("code")}
            />
            {errors.code && touched.code && (
              <ErrorMessage
                className="login-form__error-message"
                component="span"
                name="code"
              />
            )}
          </div>

          <div className="form-section">
            <label htmlFor="password" className="login-form__label">
              Nueva contraseña
            </label>
            <Field
              type="password"
              id="password"
              className="form-section__field"
              aria-label="Nueva contraseña"
              placeholder="Mínimo 8 caracteres"
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
            <label
              htmlFor="password_confirmation"
              className="login-form__label"
            >
              Confirmar nueva contraseña
            </label>
            <Field
              type="password"
              id="password_confirmation"
              className="form-section__field"
              aria-label="Confirmar nueva contraseña"
              placeholder="Repite la nueva contraseña"
              {...getFieldProps("password_confirmation")}
            />
            {errors.password_confirmation && touched.password_confirmation && (
              <ErrorMessage
                className="login-form__error-message"
                component="span"
                name="password_confirmation"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="login-form__submit"
          >
            Restablecer contraseña
          </button>

          {isSubmitting ? (
            <Loader width="20px" height="20px" />
          ) : isFormSubmitted ? (
            <span className="login-form__success-message">
              Contraseña restablecida correctamente. Redirigiendo al login...
            </span>
          ) : (
            <></>
          )}
        </NewPasswordFormStyled>
      )}
    </Formik>
  );
};

export default NewPasswordForm;
