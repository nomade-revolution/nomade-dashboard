import { useState, useEffect, useCallback } from "react";
import { AuthRegisterNomadeInterface } from "@auth";
import { ErrorMessage, Field, Formik } from "formik";
import CreateInfluencerFormStyled from "sections/user/pages/CreateInfluencerPage/CreateInfluencerFormStyled";
import { registerScheme } from "sections/auth/components/validations/validations";
import Loader from "sections/shared/components/Loader/Loader";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import TypeAhead from "sections/shared/components/TypeAhead/TypeAhead";
import { OptionsStructure } from "sections/shared/interfaces/interfaces";

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
  const { registerUser, rolesList, getRolesList } = useUserContext();
  const { getCompaniesWithParams, companies: companyOptions } =
    useCompanyContext();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  // When from users-app, always set to true and disable
  const [isCompanyTypeUser, setIsCompanyTypeUser] =
    useState<boolean>(isFromUsersApp);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null,
  );
  const [companySearchText, setCompanySearchText] = useState<string>("");
  const [companyValidationError, setCompanyValidationError] =
    useState<boolean>(false);

  const searchCompanies = useCallback(
    (text: string) => {
      if (text.length > 2) {
        getCompaniesWithParams({ filters: { search: text } });
      }
    },
    [getCompaniesWithParams],
  );

  // Load roles list when component mounts
  useEffect(() => {
    if (rolesList.length === 0) {
      getRolesList();
    }
  }, [rolesList.length, getRolesList]);

  const handleSubmitForm = async (values: AuthRegisterNomadeInterface) => {
    // Validate company selection for company users
    if (isCompanyTypeUser && !selectedCompanyId) {
      setIsFormSubmitted(true);
      setCompanyValidationError(true);
      return;
    }

    setCompanyValidationError(false);
    setIsLoading(true);
    setIsFormSubmitted(true);

    // Determine is_nomade_staff value
    // If from users-app or company type user: false
    // If from usuarios (CMS) with a role: true (will be auto-set by backend based on role, but we can be explicit)
    // If from usuarios without role: undefined (backend will handle)
    let isNomadeStaff: boolean | undefined;
    if (isCompanyTypeUser || isFromUsersApp) {
      isNomadeStaff = false;
    } else if (role && +role) {
      // If creating from usuarios with a role selected, it's a Nomade staff user
      isNomadeStaff = true;
    } else {
      isNomadeStaff = undefined;
    }

    const payload: AuthRegisterNomadeInterface = {
      ...values,
      roles: isCompanyTypeUser ? [] : [+role],
      is_nomade_staff: isNomadeStaff,
      company_id: isCompanyTypeUser ? selectedCompanyId : undefined,
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
            {!isCompanyTypeUser && (
              <ReusableSelect
                value={role}
                setValue={setRole}
                options={rolesList.map((role) => ({
                  id: role.id,
                  name: role.name,
                  value: role.id,
                }))}
                label={"Rol"}
                disabled={isCompanyTypeUser || isFromUsersApp}
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
                        } else {
                          // Clear company selection when unchecked
                          setSelectedCompanyId(null);
                          setCompanySearchText("");
                          setCompanyValidationError(false);
                        }
                      }
                    }}
                    style={{
                      cursor: isFromUsersApp ? "not-allowed" : "pointer",
                    }}
                  />
                  <span>Usuario de empresa</span>
                </label>
              </div>
            )}
            {isCompanyTypeUser && (
              <div className="form-section">
                <TypeAhead
                  value={selectedCompanyId}
                  label="Seleccionar empresa"
                  options={
                    companyOptions.map((c) => ({
                      id: c.id,
                      name: c.company || c.company_name,
                      value: c.id,
                    })) as OptionsStructure[]
                  }
                  setValue={setSelectedCompanyId}
                  getFunctions={searchCompanies}
                  searchText={companySearchText}
                />
                {companyValidationError && (
                  <span className="login-form__error-message">
                    Debe seleccionar una empresa
                  </span>
                )}
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
