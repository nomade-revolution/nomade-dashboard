import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import CustomFileInput from "sections/shared/components/CustomFileInput/CustomFileInput";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import {
  clientSchema,
  editClientSchema,
  initialData,
} from "./utils/validations/validations";
import { PartialCompany } from "@company";
import { FullAddress } from "modules/address/domain/Address";
import { FaEdit, FaEyeSlash, FaEye, FaLink } from "react-icons/fa";
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
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { Checkbox } from "@mui/material";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";
import theme from "assets/styles/theme";

const EXCLUDED_FIELDS = [
  "id",
  "instagram",
  "socialMedia",
  "contacts",
  "start_date",
  "image",
  "plan", // never send object (would become "[object Object]")
  "conditions", // object/array from form state, not expected by backend
];

/** Keys that must NOT be sent in PUT /api/companies/{id} (company only). Sent via PUT company-plan instead. */
const COMPANY_PLAN_FORM_DATA_KEYS = [
  "plan_id",
  "start_date",
  "plan_comments",
  "conditions",
  "percentage",
  "offer_type",
  "offer_id",
];

interface SubmitValues extends PartialCompany {
  plan: { start_date: string };
}

/** Payload for PUT /api/companies/{id}/company-plan (plan_id from dropdown, date Y-m-d, extension months, comments). */
export interface CompanyPlanPayload {
  plan_id: number;
  date: string;
  extension: number;
  comments: string | null;
}

interface Props {
  onSubmit: (
    companyFormData: FormData,
    id?: number,
    planPayload?: CompanyPlanPayload,
  ) => Promise<unknown>;
  type?: string;
  client?: Company;
  setIsOpen: (value: boolean) => void;
}

const CompanyForm = ({
  onSubmit,
  client,
  type,
  setIsOpen,
}: Props): React.ReactElement => {
  // plan_id from "Tipo de plan" dropdown (stored as string; sent as number in company-plan payload)
  const [formState, setFormState] = useState<{ company_plan_id: string }>({
    company_plan_id: client?.plan?.plan_id?.toString() || "1",
  });
  const { user } = useAuthContext();
  const [file, setFile] = useState<File[] | null>(() => {
    // if (client?.image) {
    //   const blob = new Blob([client.image], { type: "image/png" });
    //   const generatedFile = new File([blob], "uploaded-image.png", {
    //     type: "image/png",
    //   });
    //   return [generatedFile];
    // }
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
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isPasswordConfirmationShown, setIsPasswordConfirmationShown] =
    useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isCheked, setIsChecked] = useState<boolean>(
    client ? Boolean(client.goCardless) : false,
  );
  const [deleteImageMode, setDeleteImageMode] = useState<boolean>(false);

  const { contact_types, getAllContactTypes } = useContactContext();
  const { isSuccess, isError, loading, editCompanyCms } = useCompanyContext();

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
    const isDev = import.meta.env.MODE !== "production";
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log("[CompanyForm] onSubmit start", {
        clientId: client?.id,
        plan_id: formState.company_plan_id,
      });
    }
    if (!checkedTerms) {
      setErrors({ company: "Debes aceptar los términos y condiciones" });
    }

    setSubmitting(true);

    try {
      if (type === "edit" && deleteImageMode) {
        await editCompanyCms(
          {
            // @ts-expect-error any
            image: null,
          },
          initialValues.id,
        );
      }
    } catch (error) {
      //
    }

    const formData = new FormData();
    const formattedDate = formatDateWithDash(
      values.plan?.start_date || new Date().toISOString().split("T")[0],
    );

    Object.keys(values).forEach((key) => {
      if (!EXCLUDED_FIELDS.includes(key)) {
        const value = values[key as keyof PartialCompany];
        // Skip objects/arrays to avoid "[object Object]" in payload
        if (value != null && typeof value === "object") return;
        formData.append(key, value ?? "");
      }
    });

    // Add password_confirmation (mirror the password value)
    if (values.password) {
      formData.append("password_confirmation", values.password);
    }
    if (registerAddress) {
      formData.delete("address");

      const newAddress = {
        ...registerAddress,
        address_2: registerAddress.address_2 ?? "",
      };
      formData.append("address", JSON.stringify(newAddress));
    } else {
      // For new clients without address, provide minimal required fields
      const defaultAddress = {
        address: "Default Address", // Required field
        city_id: 1, // Required field - default to first city
        country_id: 1, // Required field - default to Spain (ID 1)
        province: "Default Province",
        zip_code: "00000",
        name: "Default Address Name",
      };
      formData.append("address", JSON.stringify(defaultAddress));
    }

    if (formattedDate) {
      formData.append("start_date", formattedDate);
    }

    // Always send accept_conditions (required by backend, even when false)
    formData.append("accept_conditions", checkedTerms ? "true" : "false");

    // Contacts: array of full objects for backend validation
    // Expected: { name, surname?, email, phone?, type_id } with name, email, type_id required
    const seenEmails = new Set<string>();
    const contactsPayload = (
      Array.isArray(registerContacts) ? registerContacts : []
    )
      .filter(
        (c): c is Record<string, unknown> => c != null && typeof c === "object",
      )
      .map((c) => {
        const name = String(c?.name ?? "").trim();
        const surname =
          c?.surname != null && String(c.surname).trim() !== ""
            ? String(c.surname).trim()
            : undefined;
        const email = String(c?.email ?? "").trim();
        const phone =
          c?.phone != null && String(c.phone).trim() !== ""
            ? String(c.phone).trim()
            : undefined;
        const typeId = Number(c?.type_id) || 0;
        return { name, surname, email, phone, type_id: typeId };
      })
      .filter((c) => {
        if (
          c.name === "" ||
          c.email === "" ||
          c.type_id <= 0 ||
          seenEmails.has(c.email)
        )
          return false;
        seenEmails.add(c.email);
        return true;
      })
      .map(({ name, surname, email, phone, type_id }) => {
        const contact: {
          name: string;
          surname?: string;
          email: string;
          phone?: string;
          type_id: number;
        } = {
          name,
          email,
          type_id,
        };
        if (surname) contact.surname = surname;
        if (phone) contact.phone = phone;
        return contact;
      });
    formData.append("contacts", JSON.stringify(contactsPayload));

    // socialMedia field removed - not needed for cms-register endpoint

    // name field is already added above from values.name (user name)
    // company name is handled via company_name field
    // Convert boolean to string for FormData
    formData.append("gocardless", isCheked ? "true" : "false");

    if (!deleteImageMode && file && file[0]) {
      formData.append("image", file![0]);
    }

    formData.delete("comments");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData.append("comments", (values as any)?.company_comments ?? "");
    formData.append("plan_id", formState.company_plan_id);

    // hash field removed - not needed for cms-register endpoint

    // Edit: PUT /companies/{id} must receive only company data. Plan goes to PUT /companies/{id}/company-plan.
    let planPayload: CompanyPlanPayload | undefined;
    if (type === "edit") {
      COMPANY_PLAN_FORM_DATA_KEYS.forEach((key) => formData.delete(key));
      // date for company-plan API: YYYY-MM-DD (formattedDate is d-m-Y)
      const [d, m, y] = formattedDate ? formattedDate.split("-") : ["", "", ""];
      const dateYmd = d && m && y ? `${y}-${m}-${d}` : "";
      const planId = Number(formState.company_plan_id);
      const comments =
        (values as { plan_comments?: string })?.plan_comments ?? null;
      planPayload = {
        plan_id: planId,
        date: dateYmd,
        extension: 0,
        comments: comments === "" ? null : comments,
      };
    }

    if (isDev) {
      // eslint-disable-next-line no-console
      console.log("[CompanyForm] calling onSubmit (editCompanyCms)", {
        clientId: client?.id,
        planPayload,
      });
    }
    const response = await onSubmit(
      formData,
      client && client?.id,
      planPayload,
    );

    // DEV-only debug logging
    if (isDev) {
      // Debug logging removed for production
    }

    if ((response as { success?: boolean })?.success) {
      // Debug logging removed for production
      setIsOpen(false);
    } else {
      // Debug logging removed for production
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

  const handleDeleteAvatarMode = (status: false | undefined) => {
    if (status === false) {
      setDeleteImageMode(false);
      return;
    }
    setDeleteImageMode(true);
    setFile([]);
  };

  const initialValues = {
    ...initialData,
    instagram:
      client?.socialMedia?.find((s) => s.name === "Instagram")?.account_name ||
      "",
    ...client,
    plan_comments: client?.plan?.comments ?? "",
    plan: {
      ...client?.plan,
      start_date: convertDateToISO(client?.plan?.start_date?.slice(0, 10)),
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={type !== "edit" ? clientSchema : editClientSchema}
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

              {errors.company_name && touched.company_name && (
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
                instagram
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

            {type !== "edit" ? (
              <section className="lead-form__section">
                <h4 className="lead-form__title">
                  Datos de acceso del usuario
                </h4>
                <div className="form-subsection">
                  <label htmlFor="name" className="form-subsection__label">
                    Nombre
                  </label>
                  <Field
                    type="text"
                    id="name"
                    className="form-subsection__field-large--company"
                    aria-label="nombre"
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
                  <label htmlFor="email" className="form-subsection__label">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    className="form-subsection__field-large--company"
                    aria-label="email"
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

                <div className="dobleContainer">
                  <div className="form-subsection">
                    <label
                      htmlFor="password"
                      className="form-subsection__label"
                    >
                      Contraseña
                    </label>
                    <Field
                      type="password"
                      id="password"
                      className="form-subsection__field-large--company"
                      aria-label="password"
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
                      Repetir contraseña
                    </label>

                    <Field
                      type="password"
                      id="password_confirmation"
                      className="form-subsection__field-large--company"
                      aria-label="password_confirmation"
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
                </div>
              </section>
            ) : null}

            {type !== "edit" ? (
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
                  <CustomCheckbox
                    onChange={handleIsChecked}
                    checked={isCheked}
                  />
                  <span>Se ha rellenado la información en Gocardless.com</span>
                </div>
              </section>
            ) : null}

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
              images={
                !file?.length && !deleteImageMode && initialValues.image
                  ? [initialValues.image + "?" + Date.now()]
                  : []
              }
              text="Imagen del cliente"
              onDeleteImage={handleDeleteAvatarMode}
            />
            {registerAddress && (
              <section className="lead-form__address">
                <span>{registerAddress.name}</span>
                {/* <span>{registerAddress.contact_name}</span> */}
                {/* <span>{registerAddress.contact_phone}</span> */}
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
              registerContacts.map((contact, index) => (
                <section
                  key={`contact-${index}`}
                  className="lead-form__address"
                >
                  <div>
                    <span>{contact.name}</span>
                    <span> {contact.surname}</span>
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
            {type === "edit" &&
              user.id === client?.id &&
              user.type !== "Nomade" && (
                <>
                  <div className="form-subsection">
                    <label
                      htmlFor="password"
                      className="form-subsection__label"
                    >
                      Contraseña
                    </label>
                    <div className="form-subsection__password">
                      <Field
                        type={isPasswordShown ? "text" : "password"}
                        id="password"
                        className="form-subsection__field-large--company"
                        aria-label="Comentarios"
                        {...getFieldProps("password")}
                      />
                      <button
                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                        className="form-subsection__password-btn"
                      >
                        {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
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
                    <div className="form-subsection__password">
                      <Field
                        type={isPasswordConfirmationShown ? "text" : "password"}
                        id="password_confirmation"
                        className="form-subsection__field-large--company"
                        aria-label="Comentarios"
                        {...getFieldProps("password_confirmation")}
                      />
                      <button
                        onClick={() =>
                          setIsPasswordConfirmationShown(
                            !isPasswordConfirmationShown,
                          )
                        }
                        className="form-subsection__password-btn"
                      >
                        {isPasswordConfirmationShown ? (
                          <FaEye />
                        ) : (
                          <FaEyeSlash />
                        )}
                      </button>
                    </div>
                    {errors.password_confirmation &&
                      touched.password_confirmation && (
                        <ErrorMessage
                          className="form-subsection__error-message"
                          component="span"
                          name="password_confirmation"
                        />
                      )}
                  </div>
                </>
              )}
          </div>
          {type !== "edit" ? (
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
          ) : null}
          <ReusableModal
            children={
              <AddressForm
                address={
                  registerAddress || {
                    address: "",
                    address_2: "",
                    city_id: "1", // Default to first city (ID 1) as string
                    country_id: 1, // Default to Spain (ID 1) instead of 0
                    name: "",
                    province: "",
                    zip_code: "",
                    id: 0, // Required field
                  }
                }
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
                type === "edit" ? (
                  "Cliente editado"
                ) : (
                  "Cliente creado"
                )
              ) : isError ? (
                "Revisa los datos e intentalo de nuevo"
              ) : type === "edit" ? (
                "Guardar cambios"
              ) : (
                "Crear cliente"
              )}
            </button>
            <button
              type="button"
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

export default CompanyForm;
