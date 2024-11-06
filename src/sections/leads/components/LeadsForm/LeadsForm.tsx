import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { leadsScheme } from "./validations/validations";
import { CompanyRegisterStructure } from "modules/user/domain/User";
import { FullAddress } from "modules/address/domain/Address";
import { ChangeEvent, useEffect, useState } from "react";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import { IoAddCircle } from "react-icons/io5";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import AddressForm from "sections/shared/components/AddressForm/AddressForm";
import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { FaCheckCircle, FaEdit, FaLink } from "react-icons/fa";
import ContactForm from "sections/shared/components/ContactForm/ContactForm";
import { Contact } from "modules/contact/domain/Contact";
import SuccessFeedback from "sections/shared/components/Feedbacks/components/SuccessFeedback/SuccessFeedback";
import { Link } from "react-router-dom";
import CustomCheckbox from "sections/shared/components/CustomCheckbox/CustomCheckbox";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import { offersCategories } from "sections/offers/utils/offersCategories";
import { useContactContext } from "sections/contact/ContactContext/useContactContext";

interface Props {
  lead: CompanyRegisterStructure;
  hash: string;
}

const initialState: CompanyRegisterStructure = {
  address: {} as FullAddress,
  company: "",
  company_name: "",
  description: "",
  email: "",
  hash: "",
  image: "",
  nif: "",
  password: "",
  password_confirmation: "",
  phone: "",
  web: "",
};

const LeadsForm = ({ lead, hash }: Props): React.ReactElement => {
  const [file, setFile] = useState<File | null>(null);
  const [registerAddress, setRegisterAddress] = useState<FullAddress | null>(
    null,
  );
  const [registerContact, setRegisterContact] = useState<Contact | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isCheked, setIsChecked] = useState<boolean>(false);
  const [type_id, setTypeId] = useState<string>("");
  const { postCompany, isSuccess } = useCompanyContext();
  const { contact_types, getAllContactTypes } = useContactContext();

  const handleIsChecked = () => {
    setIsChecked(!isCheked);
  };

  const handleSubmitForm = async (
    values: CompanyRegisterStructure,
    { setSubmitting }: FormikHelpers<CompanyRegisterStructure>,
  ) => {
    setSubmitting(true);
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      key !== "id" && formData.append(key, (values as never)[key as never]);
    });

    if (file) {
      formData.append("image", file);
    }

    registerAddress &&
      formData.append("address", JSON.stringify(registerAddress));

    registerContact &&
      formData.append("contacts", JSON.stringify([registerContact]));

    formData.append("name", values.company_name);
    formData.append("checked", JSON.stringify(isCheked));
    formData.append("type", JSON.stringify(type_id));

    await postCompany(formData);
    setSubmitting(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFile(event.currentTarget.files[0]);
    }
  };

  const handleIsAddressModalOpen = () => {
    setIsAddressModalOpen(true);
  };

  const handleIsContactModalOpen = () => {
    setIsContactModalOpen(true);
  };

  const initialValues = {
    ...initialState,
    ...lead,
    hash,
  };

  useEffect(() => {
    getAllContactTypes();
  }, [getAllContactTypes]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={leadsScheme}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <div className="leads-form">
            <h3>Alta cliente</h3>
            <section className="datasheet-form__section">
              <div className="datasheet-form__section--lead-form lead-form">
                <h4 className="lead-form__title">Información de fiscal</h4>
                <div className="lead-form__section">
                  <div className="form-subsection">
                    <label htmlFor="company" className="form-subsection__label">
                      Denominación fiscal
                    </label>
                    <Field
                      type="text"
                      id="company"
                      className="lead-form__field"
                      aria-label="Nombre del laboratorio"
                      {...getFieldProps("company")}
                    />
                    {errors.company && touched.company && (
                      <ErrorMessage
                        className="form-subsection__error-message"
                        component="span"
                        name="company"
                      />
                    )}
                  </div>
                  <div className="form-subsection">
                    <label htmlFor="nif" className="form-subsection__label">
                      NIF
                    </label>
                    <Field
                      type="text"
                      id="nif"
                      className="lead-form__field"
                      aria-label="nif"
                      {...getFieldProps("nif")}
                    />
                    {errors.nif && touched.nif && (
                      <ErrorMessage
                        className="form-subsection__error-message"
                        component="span"
                        name="nif"
                      />
                    )}
                  </div>
                  {registerAddress && (
                    <section className="lead-form__address">
                      <span>{registerAddress.address}</span>
                      <span>{registerAddress.province}</span>
                      <span>{registerAddress.zip_code}</span>
                    </section>
                  )}
                  <div className="datasheet-form__address-section">
                    <button
                      type="button"
                      className="datasheet-form__add-address"
                      onClick={handleIsAddressModalOpen}
                    >
                      {registerAddress ? (
                        <FaEdit className="datasheet-form__create--icon" />
                      ) : (
                        <IoAddCircle className="datasheet-form__create--icon" />
                      )}
                      {registerAddress
                        ? "Modificar dirección"
                        : "Añadir dirección"}
                    </button>
                    {registerAddress && (
                      <span className="datasheet-form__address-mssg">
                        <FaCheckCircle />
                        Dirección añadida
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="lead-form__section">
              <h4 className="lead-form__title">Información de facturación</h4>
              <div>
                <span className="lead-form__thirdparty-link">
                  Completar vuestros datos de facturación el siguiente enlace:
                </span>
                <Link
                  to="https://pay.gocardless.com/AL0005R1W7RZ3V"
                  target="_blank"
                  className="lead-form__link"
                >
                  <FaLink size={12} />
                  GoCardless - Nomade
                </Link>
              </div>
              <div className="lead-form__checkbox-container">
                <CustomCheckbox onChange={handleIsChecked} checked={isCheked} />
                <span>He rellenado la información en Gocardless.com</span>
              </div>
            </section>
            <section className="datasheet-form__section">
              <div className="datasheet-form__section--lead-form lead-form">
                <h4 className="lead-form__title">Información general</h4>
                <div className="lead-form__section">
                  <div className="form-subsection">
                    <label
                      htmlFor="company_name"
                      className="form-subsection__label"
                    >
                      Nombre de la empresa
                    </label>
                    <Field
                      type="text"
                      id="company_name"
                      className="lead-form__field"
                      aria-label="Nombre del laboratorio"
                      {...getFieldProps("company_name")}
                    />
                    {errors.company_name && touched.company_name && (
                      <ErrorMessage
                        className="form-subsection__error-message"
                        component="span"
                        name="company_name"
                      />
                    )}
                  </div>
                  <div className="form-subsection">
                    <label htmlFor="web" className="form-subsection__label">
                      Web
                    </label>
                    <Field
                      type="text"
                      id="web"
                      className="lead-form__field"
                      aria-label="Razón social"
                      {...getFieldProps("web")}
                    />
                    {errors.web && touched.web && (
                      <ErrorMessage
                        className="form-subsection__error-message"
                        component="span"
                        name="web"
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="lead-form__section">
              <div className="form-subsection">
                <label htmlFor="phone" className="form-subsection__label">
                  Teléfono
                </label>
                <Field
                  type="text"
                  id="phone"
                  className="lead-form__field"
                  aria-label="Teléfono de contacto"
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
                <label htmlFor="email" className="form-subsection__label">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  className="lead-form__field"
                  aria-label="Correo electrónico"
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
            </section>
            <section className="lead-form__section">
              <div className="form-subsection">
                <label htmlFor="description" className="form-subsection__label">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  id="description"
                  className="lead-form__field-textarea"
                  aria-label="Comentarios"
                  maxlength="1000"
                  {...getFieldProps("description")}
                />
                {errors.description && touched.description && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="description"
                  />
                )}
              </div>
              <div className="datasheet-form__addresses">
                <div className="form-subsection">
                  <label htmlFor="image" className="form-subsection__label">
                    Imágen
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="form-subsection__field-image"
                    aria-label="Comentarios"
                    onChange={handleFileChange}
                  />
                  {errors.image && touched.image && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="image"
                    />
                  )}
                </div>
                {registerContact && (
                  <section className="lead-form__address">
                    <div>
                      <span>{registerContact.name}</span>
                      <span>{registerContact.surname}</span>
                    </div>
                    <span>{registerContact.email}</span>
                    <span>{registerContact.phone}</span>
                    <span>
                      {
                        contact_types.find(
                          (contact) => contact.id === registerContact.type_id,
                        )?.name
                      }
                    </span>
                  </section>
                )}

                <div className="datasheet-form__contact-section">
                  <button
                    type="button"
                    className="datasheet-form__add-contact"
                    onClick={handleIsContactModalOpen}
                  >
                    {registerContact ? (
                      <FaEdit className="datasheet-form__create--icon" />
                    ) : (
                      <IoAddCircle className="datasheet-form__create--icon" />
                    )}
                    {registerContact ? "Modificar contacto" : "Añadir contacto"}
                  </button>
                  {registerContact && (
                    <span className="datasheet-form__contact-mssg">
                      <FaCheckCircle />
                      Contacto añadido
                    </span>
                  )}
                </div>
                <div className="lead-form__select">
                  <ReusableSelect
                    label="Tipo"
                    options={offersCategories}
                    setValue={setTypeId}
                    value={type_id}
                  />
                </div>
              </div>
            </section>
            <section className="lead-form__section">
              <div className="form-subsection">
                <label htmlFor="password" className="form-subsection__label">
                  Contraseña
                </label>
                <Field
                  type="password"
                  id="password"
                  className="lead-form__field"
                  aria-label="Comentarios"
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
              <div className="form-subsection">
                <label
                  htmlFor="password_confirmation"
                  className="form-subsection__label"
                >
                  Repite contraseña
                </label>
                <Field
                  type="password"
                  id="password_confirmation"
                  className="lead-form__field"
                  aria-label="Comentarios"
                  {...getFieldProps("password_confirmation")}
                />
                {errors.password_confirmation &&
                  touched.password_confirmation && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="password_confirmation"
                    />
                  )}
              </div>
              <Field
                type="hidden"
                id="hash"
                name="hash"
                className="lead-form__field"
                aria-label="Comentarios"
                value={hash}
              />
            </section>

            <section className="datasheet-form__footer">
              <button
                type="submit"
                className="datasheet-form__submit"
                disabled={isSubmitting || !isCheked}
              >
                Enviar
              </button>
              {isSuccess && (
                <SuccessFeedback text="Te has registrado correctamente" />
              )}
            </section>
            <span className="lead-form__footer-mssg">
              **No se realizará ningún cargo si no se ha efectuado ninguna
              colaboración, y solo se cobrará el plan acorde al número de
              colaboraciones realizadas durante el periodo. Queremos ser
              flexibles y transparentes.{" "}
            </span>
            <ReusableModal
              children={
                <AddressForm
                  address={registerAddress!}
                  setAddress={setRegisterAddress as never}
                  setIsModalOpen={setIsAddressModalOpen}
                />
              }
              openModal={isAddressModalOpen}
              setIsModalOpen={setIsAddressModalOpen}
            />
            <ReusableModal
              children={
                <ContactForm
                  contact={registerContact!}
                  setContact={setRegisterContact}
                  setIsModalOpen={setIsContactModalOpen}
                  contact_types={contact_types}
                />
              }
              openModal={isContactModalOpen}
              setIsModalOpen={setIsContactModalOpen}
            />
          </div>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default LeadsForm;
