/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import Loader from "sections/shared/components/Loader/Loader";
import CreateInfluencerFormStyled from "sections/user/pages/CreateInfluencerPage/CreateInfluencerFormStyled";
import { User } from "modules/user/domain/User";
import { editUserAppScheme } from "./utils/validations/validations";
import { useUserContext } from "sections/user/UserContext/useUserContext";

interface Props {
  initialState: User;
  onSubmit: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

interface EditUserAppFormState {
  name: string;
  email: string;
  // password: string;
}

const EditUserAppForm = ({ initialState, onSubmit, setIsOpen }: Props) => {
  const [formState, setFormState] = useState<EditUserAppFormState | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { modifyUserById } = useUserContext();
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInitialData = async () => {
    const parsedInitialState: EditUserAppFormState = {
      name: initialState.name,
      email: initialState.email,
      // password: "",
    };
    setFormState(parsedInitialState);
  };

  const handleSubmitForm = async (values: EditUserAppFormState) => {
    setIsLoading(true);
    setIsFormSubmitted(true);

    const formData = new FormData();
    formData.append("name", values.name);
    // formData.append(`password`, values.password);
    formData.append("email", values.email);

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

  if (!formState) return null;

  return (
    <Formik
      initialValues={formState}
      validationSchema={editUserAppScheme}
      onSubmit={handleSubmitForm}
    >
      {({ errors, handleSubmit, touched, getFieldProps }) => (
        <CreateInfluencerFormStyled
          onSubmit={handleSubmit}
          className="login-form"
          style={{ width: "80%" }}
        >
          <h3 style={{ width: "100%", textAlign: "left" }}>Editar Usuario</h3>
          <div className="dobleContainer">
            <div className="form-section">
              <label htmlFor="name" className="login-form__label">
                Nombre de usuario
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

          <div className="form-section" style={{ marginBottom: "20px" }}>
            <label htmlFor="email" className="login-form__label">
              Email / Login
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
          </div>

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
                "Usuario editado"
              ) : (
                "Guardar cambios"
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="login-form__error"
              type="button"
            >
              Cancelar
            </button>
          </div>
        </CreateInfluencerFormStyled>
      )}
    </Formik>
  );
};

export default EditUserAppForm;
