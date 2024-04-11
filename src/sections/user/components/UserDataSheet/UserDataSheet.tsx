import { ErrorMessage, Field, Formik } from "formik";
import { FullUser } from "../../../../modules/user/domain/User";
import { dataSheetScheme } from "./validations/dataSheetScheme";
import UserDatasheetStyled from "./UserDataSheetStyled";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import ReusableSelect from "../../../shared/components/ReusableSelect/ReusableSelect";
import { userRoleOptions } from "../../utils/userRoleOptions";
import { useState } from "react";

const initialState: FullUser = {
  id: 0,
  email: "",
  name: "",
  surname: "",
  phone: "",
  role: "",
  state: "",
  c_password: "",
  password: "",
};

interface UserDataSheetProps {
  user: FullUser;
}
const UserDatasheet = ({ user }: UserDataSheetProps): React.ReactElement => {
  const [role, setRole] = useState<string>(user.role);
  const handleSubmitForm = () => {};
  return (
    <Formik
      initialValues={user ? user : initialState}
      validateScheme={dataSheetScheme}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, getFieldProps }) => (
        <UserDatasheetStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Mi perfil</h3>
          <div className="datasheet-form__main-section">
            <FaUserCircle className="datasheet-form__user-icon" />
            <div className="datasheet-form__form">
              <section className="datasheet-form__section">
                <div className="form-subsection">
                  <label htmlFor="name" className="form-subsection__label">
                    Nombre
                  </label>
                  <Field
                    type="text"
                    id="name"
                    className="form-subsection__field"
                    aria-label="Nombre"
                    readOnly
                    {...getFieldProps("name")}
                  />
                  {errors.name && touched.name && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="name"
                    />
                  )}
                </div>
                <div className="form-subsection">
                  <label htmlFor="surname" className="form-subsection__label">
                    Apellido/s
                  </label>
                  <Field
                    type="text"
                    id="surname"
                    className="form-subsection__field"
                    aria-label="Apellido o apellidos"
                    readOnly
                    {...getFieldProps("surname")}
                  />
                  {errors.surname && touched.surname && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="surname"
                    />
                  )}
                </div>
                <div className="form-subsection">
                  <label htmlFor="password" className="form-subsection__label">
                    Contraseña
                  </label>
                  <Field
                    type="password"
                    id="password"
                    className="form-subsection__field"
                    aria-label="contraseña"
                    readOnly
                    {...getFieldProps("password")}
                  />
                  {errors.password && touched.password && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="password"
                    />
                  )}
                </div>
              </section>
              <section className="datasheet-form__section">
                <div className="form-subsection">
                  <label htmlFor="email" className="form-subsection__label">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    className="form-subsection__field"
                    aria-label="Correo electrónico"
                    readOnly
                    {...getFieldProps("email")}
                  />
                  {errors.email && touched.email && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="email"
                    />
                  )}
                </div>
                <div className="form-subsection">
                  <label htmlFor="phone" className="form-subsection__label">
                    Teléfono
                  </label>
                  <Field
                    type="text"
                    id="phone"
                    className="form-subsection__field"
                    aria-label="Teléfono"
                    readOnly
                    {...getFieldProps("phone")}
                  />
                  {errors.phone && touched.phone && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="phone"
                    />
                  )}
                </div>
                <div className="form-subsection">
                  <label
                    htmlFor="c_password"
                    className="form-subsection__label"
                  >
                    Repetir contraseña
                  </label>
                  <Field
                    type="password"
                    id="c_password"
                    className="form-subsection__field"
                    aria-label="Repetir contraseña"
                    readOnly
                    {...getFieldProps("c_password")}
                  />
                  {errors.c_password && touched.c_password && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="c_password"
                    />
                  )}
                </div>
              </section>

              <section className="datasheet-form__section">
                <div className="form-subsection">
                  <label htmlFor="role" className="form-subsection__label">
                    Rol
                  </label>
                  <ReusableSelect
                    label="Rol"
                    options={userRoleOptions}
                    setValue={setRole}
                    value={role}
                  />
                  {errors.role && touched.role && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="role"
                    />
                  )}
                </div>
              </section>
              <button className="datasheet-form__submitButton">
                <FaEdit />
                Actualizar datos
              </button>
            </div>
          </div>
        </UserDatasheetStyled>
      )}
    </Formik>
  );
};

export default UserDatasheet;
