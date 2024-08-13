import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { loginScheme } from "../validations/validations";
import LoginFormStyled from "./LoginFormStyled";
import { useLoginForm } from "../../hooks/useLoginForm";

import { useState } from "react";
import { AuthLoginInterface } from "@auth";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import Loader from "sections/shared/components/Loader/Loader";

const initialState: AuthLoginInterface = {
  email: "",
  password: "",
};

const LoginForm = (): React.ReactElement => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const { submitForm } = useLoginForm();
  const { isSuccess } = useAuthContext();

  const handleSubmitForm = async (
    values: AuthLoginInterface,
    { setSubmitting }: FormikHelpers<AuthLoginInterface>,
  ) => {
    submitForm(values);
    setSubmitting(false);
    setIsFormSubmitted(true);
  };

  return (
    <Formik
      initialValues={initialState}
      validateScheme={loginScheme}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, isSubmitting, getFieldProps }) => (
        <LoginFormStyled onSubmit={handleSubmit} className="login-form">
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
          <div className="form-section">
            <label htmlFor="password" className="login-form__label">
              Contraseña
            </label>
            <Field
              type="password"
              id="password"
              className="form-section__field"
              aria-label="Contraseña"
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
          <span>
            ¿Olvidaste la contraseña?{" "}
            <a href="" className="login-form__forgot-password">
              Haz click aquí
            </a>
          </span>
          <button
            type="submit"
            disabled={isSubmitting}
            className="login-form__submit"
          >
            Iniciar sesión
          </button>
          <span>
            ¿Todavía no tienes cuenta?{" "}
            <a href="" className="login-form__forgot-password">
              Registrate aquí
            </a>
          </span>

          {isSuccess && isFormSubmitted ? (
            <Loader width="20px" height="20px" />
          ) : (
            !isSuccess &&
            isFormSubmitted && (
              <span className="login-form__error-message">
                Credenciales inválidas
              </span>
            )
          )}
        </LoginFormStyled>
      )}
    </Formik>
  );
};

export default LoginForm;
