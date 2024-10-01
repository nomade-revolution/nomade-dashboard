import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { loginScheme } from "../validations/validations";
import LoginFormStyled from "./LoginFormStyled";
import { useLoginForm } from "../../hooks/useLoginForm";

import { useState } from "react";
import { AuthLoginInterface } from "@auth";
import Loader from "sections/shared/components/Loader/Loader";
import { Link } from "react-router-dom";

const initialState: AuthLoginInterface = {
  email: "",
  password: "",
};

const LoginForm = (): React.ReactElement => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const { submitForm } = useLoginForm();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmitForm = async (
    values: AuthLoginInterface,
    { setSubmitting }: FormikHelpers<AuthLoginInterface>,
  ) => {
    setIsFormSubmitted(true);
    const resp = await submitForm(values);

    setIsSuccess(Boolean(resp));
    setSubmitting(false);

    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 5000);
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
            <Link
              to={"/recovery-password"}
              className="login-form__forgot-password"
            >
              Haz click aquí
            </Link>
          </span>
          <button
            type="submit"
            disabled={isSubmitting}
            className="login-form__submit"
          >
            Iniciar sesión
          </button>
          {/* <span>
            ¿Todavía no tienes cuenta?{" "}
            <a href="" className="login-form__forgot-password">
              Registrate aquí
            </a>
          </span> */}

          {isSubmitting ? (
            <Loader width="20px" height="20px" />
          ) : !isSuccess && isFormSubmitted ? (
            <span className="login-form__error-message">
              Credenciales inválidas
            </span>
          ) : isFormSubmitted && isSuccess ? (
            <Loader width="20px" height="20px" />
          ) : (
            <></>
          )}
        </LoginFormStyled>
      )}
    </Formik>
  );
};

export default LoginForm;
