import { useState } from "react";
import { AuthRegisterNomadeInterface } from "@auth";
import { ErrorMessage, Field, Formik } from "formik";
import CreateInfluencerFormStyled from "sections/user/pages/CreateInfluencerPage/CreateInfluencerFormStyled";
import { registerScheme } from "sections/auth/components/validations/validations";
import Loader from "sections/shared/components/Loader/Loader";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";

const initialState: AuthRegisterNomadeInterface = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  roles: [],
};

interface CreateUserFormProps {
  onSubmit: (success: boolean) => void;
  setIsOpen: (value: boolean) => void;
  isFromUsersApp?: boolean; // Flag to indicate if opened from users-app page
  hideCompanyCheckbox?: boolean; // Flag to hide the company checkbox (for CMS users page)
}

const CreateUserForm = ({
  onSubmit,
  setIsOpen,
  isFromUsersApp = false,
  hideCompanyCheckbox = false,
}: CreateUserFormProps) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { registerUser, rolesList } = useUserContext();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  // When from users-app, always set to true and disable
  const [isCompanyTypeUser, setIsCompanyTypeUser] =
    useState<boolean>(isFromUsersApp);

  const handleSubmitForm = async (values: AuthRegisterNomadeInterface) => {
    setIsLoading(true);
    setIsFormSubmitted(true);

    const payload: AuthRegisterNomadeInterface = {
      ...values,
      roles: isCompanyTypeUser ? [] : [+role],
      is_nomade_staff: isCompanyTypeUser ? false : undefined,
    };

    const resp = await registerUser(payload);
    const success = Boolean(resp.success);
    setIsSuccess(success);
    setIsLoading(false);

    if (success) {
      setTimeout(() => {
        setIsOpen(false);
        onSubmit(success);
      }, 1500);
    }

    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 5000);
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ marginBottom: "20px" }}>Crear usuario</h2>
      <Formik
        initialValues={initialState}
        validationSchema={registerScheme}
        onSubmit={handleSubmitForm}
      >
        {({ errors, handleSubmit, touched, getFieldProps }) => (
          <CreateInfluencerFormStyled
            onSubmit={handleSubmit}
            className="login-form"
            style={{ width: "100%" }}
          >
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
            {!isFromUsersApp && (
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
            )}
            {!hideCompanyCheckbox && (
              <div className="form-section">
                <label
                  htmlFor="isCompanyTypeUser"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: isFromUsersApp ? "default" : "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    id="isCompanyTypeUser"
                    checked={isCompanyTypeUser}
                    disabled={isFromUsersApp}
                    onChange={(e) => {
                      if (!isFromUsersApp) {
                        setIsCompanyTypeUser(e.target.checked);
                        if (e.target.checked) {
                          setRole(""); // Clear role when checked
                        }
                      }
                    }}
                    style={{
                      cursor: isFromUsersApp ? "not-allowed" : "pointer",
                    }}
                  />
                  <span>Usuario de empresa (sin asignar empresa aún)</span>
                </label>
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: "10px",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
              <button
                onClick={() => setIsOpen(false)}
                className={"login-form__error"}
              >
                Cancelar
              </button>
            </div>
          </CreateInfluencerFormStyled>
        )}
      </Formik>
    </div>
  );
};

export default CreateUserForm;
