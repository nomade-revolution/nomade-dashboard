import { useState } from "react";
import { AuthRegisterNomadeInterface } from "@auth";
import { ErrorMessage, Field, Formik } from "formik";
import LoginFormStyled from "sections/auth/components/LoginForm/LoginFormStyled";
import { registerScheme } from "sections/auth/components/validations/validations";
import Loader from "sections/shared/components/Loader/Loader";
import CreateUserPageStyled from "./CreateUserPageStyled";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import { useNavigate } from "react-router-dom";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";

const initialState: AuthRegisterNomadeInterface = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  roles: [],
};

const CreateUserPage = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { registerUser, rolesList } = useUserContext();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [isCompanyTypeUser, setIsCompanyTypeUser] = useState<boolean>(false);

  const handleSubmitForm = async (values: AuthRegisterNomadeInterface) => {
    setIsLoading(true);
    setIsFormSubmitted(true);

    const payload: AuthRegisterNomadeInterface = {
      ...values,
      roles: isCompanyTypeUser ? [] : [+role],
      is_nomade_staff: isCompanyTypeUser ? false : undefined,
    };

    // If creating company-type user without company
    if (isCompanyTypeUser) {
      // payload already set above
    }

    const resp = await registerUser(payload);
    setIsSuccess(Boolean(resp.success));
    setIsLoading(false);
    if (isSuccess) {
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    }
    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 5000);
  };

  return (
    <CreateUserPageStyled>
      <div className="header">
        <GoBackButton />
        <h2>Crear usuario</h2>
        <div />
      </div>
      <Formik
        initialValues={initialState}
        validationSchema={registerScheme}
        onSubmit={handleSubmitForm}
      >
        {({ errors, handleSubmit, touched, getFieldProps }) => (
          <LoginFormStyled onSubmit={handleSubmit} className="login-form">
            <div className="form-section">
              <label htmlFor="name" className="login-form__label">
                Nombre
              </label>
              <Field
                type="text"
                id="name"
                className="form-section__field"
                aria-label="name"
                {...getFieldProps("name")}
              />
              {errors.name && touched.name && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="name"
                />
              )}
            </div>
            <div className="form-section">
              <label htmlFor="email" className="login-form__label">
                Email
              </label>
              <Field
                type="email"
                id="email"
                className="form-section__field"
                aria-label="email"
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
              <label htmlFor="repeatPassword" className="login-form__label">
                Repetir contraseña
              </label>
              <Field
                type="password"
                id="repeatPassword"
                className="form-section__field"
                aria-label="repeatPassword"
                {...getFieldProps("repeatPassword")}
              />
              {errors.repeatPassword && touched.repeatPassword && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="repeatPassword"
                />
              )}
            </div>
            <ReusableSelect
              value={role}
              setValue={setRole}
              options={rolesList.map((role) => ({
                id: role.id,
                name: role.name,
                value: role.id,
              }))}
              label={"Rol"}
              disabled={isCompanyTypeUser}
            />
            <div className="form-section">
              <label
                htmlFor="isCompanyTypeUser"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  id="isCompanyTypeUser"
                  checked={isCompanyTypeUser}
                  onChange={(e) => {
                    setIsCompanyTypeUser(e.target.checked);
                    if (e.target.checked) {
                      setRole(""); // Clear role when checked
                    }
                  }}
                  style={{ cursor: "pointer" }}
                />
                <span>Usuario de empresa (sin asignar empresa aún)</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="login-form__submit"
            >
              {loading ? (
                <Loader width="20px" height="20px" />
              ) : !isSuccess && isFormSubmitted ? (
                <span className="login-form__error-message">
                  Datos no validos
                </span>
              ) : isFormSubmitted && isSuccess ? (
                <Loader width="20px" height="20px" />
              ) : isSuccess && isFormSubmitted ? (
                "Usuario creado"
              ) : (
                "Crear usuario"
              )}
            </button>
          </LoginFormStyled>
        )}
      </Formik>
    </CreateUserPageStyled>
  );
};

export default CreateUserPage;
