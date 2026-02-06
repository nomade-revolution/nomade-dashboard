import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import CustomFileInput from "sections/shared/components/CustomFileInput/CustomFileInput";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import { clientSchema, initialData } from "./utils/validations/validations";
import { PartialCompany } from "@company";
import { FullAddress } from "modules/address/domain/Address";
import { FaEdit, FaLink } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import AddressForm from "sections/shared/components/AddressForm/AddressForm";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import { billingOptions } from "./utils/options/options";
import { Contact, ContactType } from "modules/contact/domain/Contact";
import ContactForm from "sections/shared/components/ContactForm/ContactForm";
import { useContactContext } from "sections/contact/ContactContext/useContactContext";
import { Link } from "react-router-dom";
import CustomCheckbox from "sections/shared/components/CustomCheckbox/CustomCheckbox";
import Loader from "sections/shared/components/Loader/Loader";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import { formatDateWithDash } from "sections/shared/utils/formatDate/formatDate";
import { Company } from "modules/user/domain/User";
import { Checkbox } from "@mui/material";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";
import theme from "assets/styles/theme";

const EXCLUDED_FIELDS = [
  "id",
  "instagram",
  "socialMedia",
  "contacts",
  "start_date",
];

interface SubmitValues extends PartialCompany {
  plan: { start_date: string };
}

interface Props {
  onSubmit: (values: FormData, id?: number) => void;
  type?: string;
  client?: Company;
  setIsOpen: (value: boolean) => void;
}

const AddCompanyForm = ({
  onSubmit,
  client,
  // type,
  setIsOpen,
}: Props): React.ReactElement => {
  const [formState, setFormState] = useState<{ company_plan_id: string }>({
    company_plan_id: "7",
  });
  const [file, setFile] = useState<File[] | null>(() => {
    return null;
  });
  const [checkedTerms, setIsCheckedTerms] = useState<boolean>(false);
  const [registerAddress, setRegisterAddress] = useState<FullAddress | null>(
    client ? client.address : null,
  );
  const [registerContacts, setRegisterContacts] = useState<Contact[]>(
    client ? (client.contacts as never) : [],
  );
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isCheked, setIsChecked] = useState<boolean>(
    client ? Boolean(client.goCardless) : false,
  );

  const { contact_types, getAllContactTypes } = useContactContext();
  const { isSuccess, isError, loading } = useCompanyContext();

  const handleFormStateChange = (field: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleIsAddressModalOpen = () => {
    setIsAddressModalOpen(true);
  };

  const handleIsContactModalOpen = () => {
    setIsContactModalOpen(true);
  };

  const handleIsChecked = () => {
    setIsChecked(!isCheked);
  };

  const handleSubmitForm = async (
    values: SubmitValues,
    { setSubmitting, setErrors }: FormikHelpers<PartialCompany>,
  ) => {
    if (!checkedTerms) {
      setErrors({ company: "Debes aceptar los términos y condiciones" });
    }

    setSubmitting(true);
    const formData = new FormData();
    const formattedDate = formatDateWithDash(values.plan?.start_date);

    Object.keys(values).forEach((key) => {
      if (!EXCLUDED_FIELDS.includes(key)) {
        const value = values[key as keyof PartialCompany];
        formData.append(key, value || "");
      }
    });
    if (registerAddress) {
      formData.delete("address");

      const newAddress = {
        ...registerAddress,
        address_2: registerAddress.address_2 ?? "",
      };
      formData.append("address", JSON.stringify(newAddress));
    }

    formData.append("start_date", formattedDate);

    if (checkedTerms) {
      formData.append("accept_conditions", JSON.stringify(checkedTerms));
    }

    if (registerContacts.length > 0) {
      // formData.append("contacts", JSON.stringify(registerContacts));
      registerContacts.forEach((contact, index) => {
        Object.keys(contact).forEach((key) => {
          // @ts-expect-error TODO fix this
          formData.append(`contacts[${index}][${key}]`, contact[key]);
        });
      });
    }

    if (values.instagram) {
      // caso "ya hay socialMedia" -> buscar y actualizar instagram
      if (client?.socialMedia?.length) {
        const newSocialMedias = client.socialMedia.map((socialMedia) => {
          if (socialMedia.name === "Instagram") {
            return {
              social_media_id: socialMedia.id,
              account_name: values.instagram,
            };
          }
          return socialMedia;
        });
        formData.append("socialMedia", JSON.stringify(newSocialMedias));
      } else {
        // caso "no hay socialMedia" -> crear uno nuevo con instagram
        // const newSocialMedias = [
        //   {
        //     social_media_id: 1, // hardcoded id for instagram
        //     account_name: values.instagram,
        //   },
        // ];
        // formData.append("socialMedia", JSON.stringify(newSocialMedias));
        formData.append("socialMedia[0][social_media_id]", "1");
        formData.append("socialMedia[0][account_name]", values.instagram);
        // formData.append("socialMedia[0][followers]", "10");
      }
    }

    formData.append("name", values.company_name);
    formData.append("gocardless", JSON.stringify(isCheked));

    if (file) {
      formData.append("image", file![0]);
    } else {
      formData.delete("image");
    }
    formData.delete("comments");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData.append("comments", (values as any)?.company_comments);
    formData.append("plan_id", formState.company_plan_id);

    await onSubmit(formData, client && client?.id);

    if (isSuccess) {
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);
    }

    setSubmitting(false);
  };

  useEffect(() => {
    getAllContactTypes();
  }, [getAllContactTypes]);

  const convertDateToISO = (date?: string): string => {
    if (!date) return "";
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const initialValues = {
    ...initialData,
    instagram:
      client?.socialMedia?.find((s) => s.name === "Instagram")?.account_name ||
      "",
    ...client,
    plan: {
      ...client?.plan,
      start_date: convertDateToISO(client?.plan?.start_date?.slice(0, 10)),
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={clientSchema}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Cliente</h3>
          <div className="datasheet-form__content">
            <h4 className="datasheet-form__title">Información del cliente</h4>
            <div className="form-subsection">
              <label htmlFor="company" className="form-subsection__label">
                Nombre del cliente
              </label>
              <Field
                type="text"
                id="company"
                className="form-subsection__field-large--company"
                aria-label="Cliente"
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
              <label htmlFor="company_name" className="form-subsection__label">
                Razón social
              </label>
              <Field
                type="text"
                id="company_name"
                className="form-subsection__field-large--company"
                aria-label="Razón social"
                {...getFieldProps("company_name")}
              />

              {errors.company && touched.company && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="company_name"
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
                className="form-subsection__field-large--company"
                aria-label="Alias"
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
            <div className="form-subsection">
              <label htmlFor="web" className="form-subsection__label">
                Web
              </label>
              <Field
                type="web"
                id="web"
                className="form-subsection__field-large--company"
                aria-label="Correo electrónico"
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
            <div className="form-subsection">
              <label htmlFor="phone" className="form-subsection__label">
                Teléfono
              </label>
              <Field
                type="phone"
                id="phone"
                className="form-subsection__field-large--company"
                aria-label="Correo electrónico"
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
              <label htmlFor="instagram" className="form-subsection__label">
                Instagram
              </label>
              <Field
                type="text"
                id="instagram"
                className="form-subsection__field-large--company"
                aria-label="Alias"
                {...getFieldProps("instagram")}
              />
              {errors.instagram && touched.instagram && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="instagram"
                />
              )}
            </div>

            <div className="form-subsection">
              <label htmlFor="description" className="form-subsection__label">
                Descripción
              </label>
              <Field
                type="text"
                id="description"
                className="form-subsection__field-textarea--company"
                aria-label="Nombre del laboratorio"
                as={"textarea"}
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
            <div className="form-subsection">
              <label
                htmlFor="company_comments"
                className="form-subsection__label"
              >
                Comentarios acerca del cliente
              </label>
              <Field
                type="text"
                id="company_comments"
                className="form-subsection__field-textarea--company"
                aria-label="Comentario de cliente"
                as={"textarea"}
                {...getFieldProps("company_comments")}
              />
              {errors.company_comments && touched.company_comments && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="company_comments"
                />
              )}
            </div>

            <section className="lead-form__section">
              <h4 className="lead-form__title">Información de facturación</h4>
              <div className="lead-form__section-link">
                <span className="lead-form__thirdparty-link">
                  Completar los datos de facturación el siguiente enlace:
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
                <span>Se ha rellenado la información en Gocardless.com</span>
              </div>
            </section>

            <h4 className="datasheet-form__title">Información del plan</h4>
            <section className="datasheet-form__section">
              <div className="form-subsection">
                <label htmlFor="type_id" className="form-subsection__label">
                  Tipo de plan
                </label>
                <ReusableSelect
                  label="Plan"
                  options={billingOptions}
                  setValue={(value) => {
                    handleFormStateChange("company_plan_id", value);
                  }}
                  value={
                    formState.company_plan_id ||
                    client?.plan?.plan_id.toString() ||
                    ""
                  }
                />
              </div>
              <div className="form-subsection">
                <label htmlFor="start_date" className="form-subsection__label">
                  Inicio plan
                </label>
                <Field
                  type="date"
                  id="start_date"
                  className="form-subsection__field-date"
                  aria-label="Correo electrónico"
                  {...getFieldProps("plan[start_date]")}
                />
                {errors.start_date && touched.start_date && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="start_date"
                  />
                )}
              </div>
            </section>
            <div className="form-subsection">
              <label htmlFor="plan_comments" className="form-subsection__label">
                Comentarios acerca del plan
              </label>
              <Field
                type="text"
                id="plan_comments"
                className="form-subsection__field-textarea--company"
                aria-label="Nombre del laboratorio"
                as={"textarea"}
                {...getFieldProps("plan_comments")}
              />
              {errors.plan_comments && touched.plan_comments && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="plan_comments"
                />
              )}
            </div>

            <h4 className="datasheet-form__title">Datos adicionales</h4>
            <CustomFileInput
              setFile={setFile}
              file={file!}
              text="Imagen del cliente"
            />
            {registerAddress && (
              <section className="lead-form__address">
                <span>{registerAddress.name}</span>
                {/* <span>{registerAddress.contact_name}</span>
                <span>{registerAddress.contact_phone}</span> */}
                <span>
                  {registerAddress.address} {registerAddress.address_2 || ""}
                </span>
                <span>
                  {registerAddress.province} {registerAddress.zip_code}
                </span>
                <span>{registerAddress.country}</span>
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
                {registerAddress ? "Modificar dirección" : "Añadir dirección"}
              </button>
            </div>
            {registerContacts &&
              registerContacts.map((contact) => (
                <section className="lead-form__address">
                  <div>
                    <span>{contact.name}</span>
                    <span>{contact.surname}</span>
                  </div>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                  <span>
                    {
                      contact_types.find(
                        (type: ContactType) => type.id === contact.type_id,
                      )?.name
                    }
                  </span>
                </section>
              ))}

            <div className="datasheet-form__contact-section">
              <button
                type="button"
                className="datasheet-form__add-contact"
                onClick={handleIsContactModalOpen}
              >
                {registerContacts?.length > 0 ? (
                  <FaEdit className="datasheet-form__create--icon" />
                ) : (
                  <IoAddCircle className="datasheet-form__create--icon" />
                )}
                {registerContacts?.length > 0
                  ? "Modificar contacto"
                  : "Añadir contacto"}
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Checkbox
              onChange={(e) => setIsCheckedTerms(e.target.checked)}
              value={checkedTerms}
              checked={checkedTerms}
            />
            <span>
              He leído y acepto los{" "}
              <Link
                to={`${appPaths.termsConditionsOffline}?type=company`}
                target="_blank"
                style={{
                  color: theme.fontsColors.corporativeColor,
                }}
              >
                Términos y Condiciones
              </Link>
            </span>
          </div>
          <ReusableModal
            children={
              <AddressForm
                address={registerAddress || ({} as FullAddress)}
                setAddress={setRegisterAddress as never}
                setIsModalOpen={setIsAddressModalOpen}
              />
            }
            openModal={isAddressModalOpen}
            setIsModalOpen={setIsAddressModalOpen}
          />
          <ReusableModal
            openModal={isContactModalOpen}
            setIsModalOpen={setIsContactModalOpen}
            children={
              <ContactForm
                contacts={registerContacts}
                setContacts={setRegisterContacts}
                setIsModalOpen={setIsContactModalOpen}
                contact_types={contact_types}
              />
            }
          />
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
              disabled={isSubmitting}
              className={
                isSuccess
                  ? "datasheet-form__success"
                  : isError
                    ? "datasheet-form__error"
                    : "datasheet-form__submit"
              }
            >
              {isSubmitting || loading ? (
                <Loader width="20px" height="20px" />
              ) : isSuccess ? (
                "Cliente creado"
              ) : isError ? (
                "Revisa los datos e intentalo de nuevo"
              ) : (
                "Crear cliente"
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className={"datasheet-form__error"}
            >
              Cancelar
            </button>
          </div>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default AddCompanyForm;
