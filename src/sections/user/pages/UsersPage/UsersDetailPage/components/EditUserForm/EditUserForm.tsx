/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import Loader from "sections/shared/components/Loader/Loader";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import CreateInfluencerFormStyled from "sections/user/pages/CreateInfluencerPage/CreateInfluencerFormStyled";
import { User } from "modules/user/domain/User";
import { editInfluencerScheme } from "./utils/validations/validations";
import { useUserContext } from "sections/user/UserContext/useUserContext";

interface Props {
  initialState: User;
  onSubmit: () => void;
}

interface EditUserFormState {
  name: string;
  email: string;
  rol: string;
}

const EditUserForm = ({ initialState, onSubmit }: Props) => {
  const [formState, setFormState] = useState<EditUserFormState | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { modifyUserById } = useUserContext();
  const { rolesList, getRolesList } = useUserContext();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInitialData = async () => {
    const rol = initialState.roles?.length
      ? initialState.roles[0].toString()
      : "";
    const parsedInitialState: EditUserFormState = {
      name: initialState.name,
      email: initialState.email,
      rol: rol,
    };

    setSelectedRole(rol);
    setFormState(parsedInitialState);
  };

  const handleSubmitForm = async (values: EditUserFormState) => {
    setIsLoading(true);
    setIsFormSubmitted(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append(`roles[0]`, values.rol);

    try {
      const resp: any = await modifyUserById(initialState.id, formData as any);
      setIsSuccess(Boolean(resp.success));

      setIsLoading(false);

      if (resp.success) {
        onSubmit();
        return;
      }
    } catch (e) {
      setIsSuccess(false);
      setIsLoading(false);
    }
    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 1500);
  };

  useEffect(() => {
    if (rolesList.length === 0) {
      getRolesList();
    }
  }, [rolesList, getRolesList]);

  if (!formState) return null;

  return (
    <Formik
      initialValues={formState}
      validationSchema={editInfluencerScheme}
      onSubmit={handleSubmitForm}
    >
      {({ errors, handleSubmit, touched, getFieldProps, setFieldValue }) => (
        <CreateInfluencerFormStyled
          onSubmit={handleSubmit}
          className="login-form"
          style={{ width: "80%" }}
        >
          <h3 style={{ width: "100%", textAlign: "left" }}>Datos</h3>
          <div className="dobleContainer">
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
          </div>

          {/* <div className="form-section">
            <label htmlFor="email" className="login-form__label">
              Email
            </label>
            <Field
              type="text"
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
          </div> */}

          <div className="form-section">
            <label htmlFor="name" className="login-form__label">
              Roles
            </label>
            <ReusableSelect
              label=""
              options={rolesList.map((role) => ({
                id: role.id,
                name: role.name,
                value: role.id,
              }))}
              setValue={(value) => {
                if (!value) return;
                setFieldValue("rol", value.toString());
                setSelectedRole(value.toString());
              }}
              value={selectedRole}
            />
          </div>

          {/* Show user type information (read-only) */}
          {initialState.type && (
            <div className="form-section">
              <label className="login-form__label">Tipo de usuario</label>
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  color: "#666",
                }}
              >
                {initialState.type === "Nomade" && "Personal de Nomade"}
                {initialState.type === "users_app" &&
                  "Usuario pendiente (sin empresa asignada)"}
                {initialState.type === "Company" && "Usuario de empresa"}
                {initialState.type === "Influencer" && "Influencer"}
                {(initialState.type === "Company" ||
                  initialState.type === "Influencer") &&
                  initialState.companies &&
                  initialState.companies.length > 0 && (
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.9em",
                        marginTop: "5px",
                        color: "#999",
                      }}
                    >
                      (No se puede cambiar el tipo de usuario con relaciones
                      activas)
                    </span>
                  )}
              </div>
            </div>
          )}

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
              "Usuario editado"
            ) : (
              "Editar usuario"
            )}
          </button>
        </CreateInfluencerFormStyled>
      )}
    </Formik>
  );
};

export default EditUserForm;
