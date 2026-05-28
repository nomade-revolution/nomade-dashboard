import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import {
  Formik,
  Field,
  FormikHelpers,
  FormikErrors,
  FormikTouched,
} from "formik";
import { useEffect, useState } from "react";
import CustomFileInput from "sections/shared/components/CustomFileInput/CustomFileInput";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import {
  clientSchema,
  editClientSchema,
  initialData,
  type CompanyFormValues,
} from "./utils/validations/validations";
import { Company } from "modules/user/domain/User";
import { FullAddress } from "modules/address/domain/Address";
import {
  FaEdit,
  FaEyeSlash,
  FaEye,
  FaLink,
  FaCheckCircle,
} from "react-icons/fa";
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
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { Checkbox } from "@mui/material";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";
import theme from "assets/styles/theme";
import { appendContactsToFormData } from "sections/shared/utils/appendContactsToFormData";
import { appendSocialMediaToFormData } from "sections/shared/utils/appendSocialMediaToFormData";
import {
  isFormikServerAlertStatus,
  splitLaravelErrorsForFormik,
} from "sections/shared/utils/mapLaravelErrorsForFormik";

function fieldErrorMessage(
  errors: FormikErrors<CompanyFormValues>,
  field: keyof CompanyFormValues,
): string | null {
  const e = errors[field];
  if (typeof e === "string" && e.length > 0) return e;
  if (Array.isArray(e) && typeof e[0] === "string") return e[0];
  return null;
}

function shouldShowFieldError(
  errors: FormikErrors<CompanyFormValues>,
  touched: FormikTouched<CompanyFormValues>,
  submitCount: number,
  field: keyof CompanyFormValues,
): boolean {
  const msg = fieldErrorMessage(errors, field);
  if (!msg) return false;
  if (field === "terms" || field === "contacts") return true;
  return Boolean(touched[field]) || submitCount > 0;
}

const EXCLUDED_FIELDS = [
  "id",
  "instagram",
  "socialMedia",
  "contacts",
  "start_date",
  "image",
  "plan", // never send object (would become "[object Object]")
  "conditions", // object/array from form state, not expected by backend
  "terms", // UI-only error key for términos
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
  const [hasTouchedPlan, setHasTouchedPlan] = useState(false);
  const { user } = useAuthContext();

  // Sync plan selector from client when client (or client.plan) changes and user has not touched it
  useEffect(() => {
    if (hasTouchedPlan) return;
    const planId = client?.plan?.plan_id;
    if (planId != null) {
      setFormState((prev) => ({ ...prev, company_plan_id: String(planId) }));
    }
  }, [client?.plan?.plan_id, hasTouchedPlan]);
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
  // Deduplicate contacts by first_name/last_name/email/phone for initial state (temporary frontend patch)
  const [registerContacts, setRegisterContacts] = useState<Contact[]>(() => {
    const contacts = (client?.contacts ?? []) as Array<{
      first_name?: string;
      last_name?: string;
      name?: string;
      surname?: string;
      email?: string;
      phone?: string;
      type?: string;
      type_id?: number;
    }>;
    const result: Contact[] = [];
    const seen = new Set<string>();
    contacts.forEach((contact) => {
      const firstName = contact.first_name ?? contact.name ?? "";
      const lastName = contact.last_name ?? contact.surname ?? "";
      const key = [
        firstName,
        lastName,
        contact.email ?? "",
        contact.phone ?? "",
      ].join("|");
      if (!seen.has(key)) {
        seen.add(key);
        result.push({
          name: contact.name ?? contact.first_name ?? "",
          surname: contact.surname ?? contact.last_name ?? "",
          email: contact.email ?? "",
          phone: contact.phone ?? "",
          type: contact.type ?? "",
          type_id: contact.type_id ?? 0,
        });
      }
    });
    return result;
  });
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
    values: CompanyFormValues,
    { setSubmitting, setErrors, setStatus }: FormikHelpers<CompanyFormValues>,
  ) => {
    setStatus(undefined);

    const isCreate = type !== "edit";

    // Terms acceptance is only required in create mode. In edit mode there is
    // no terms checkbox rendered, so checkedTerms is permanently false and
    // would silently block the submit. Restrict the guard to create only.
    if (isCreate && !checkedTerms) {
      setErrors({ terms: "Debes aceptar los términos y condiciones" });
      return;
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

      const formData = new FormData();
      const formattedDate = formatDateWithDash(
        values.plan?.start_date || new Date().toISOString().split("T")[0],
      );

      Object.keys(values).forEach((key) => {
        if (!EXCLUDED_FIELDS.includes(key)) {
          const value = values[key as keyof CompanyFormValues];
          // Skip objects/arrays to avoid "[object Object]" in payload
          if (value != null && typeof value === "object") return;
          formData.append(key, String(value ?? ""));
        }
      });

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
        const defaultAddress = {
          address: "Default Address",
          city_id: 1,
          country_id: 1,
          province: "Default Province",
          zip_code: "00000",
          name: "Default Address Name",
        };
        formData.append("address", JSON.stringify(defaultAddress));
      }

      if (formattedDate) {
        formData.append("start_date", formattedDate);
      }

      formData.append("accept_conditions", JSON.stringify(checkedTerms));
      formData.append("gocardless", JSON.stringify(isCheked));

      const seenEmails = new Set<string>();
      const contactsPayload = (
        Array.isArray(registerContacts) ? registerContacts : []
      )
        .filter((c): c is Contact => c != null && typeof c === "object")
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

      const contactsForBracket = contactsPayload.map((c) => ({
        name: c.name,
        surname: c.surname ?? "",
        email: c.email,
        phone: c.phone ?? "",
        type_id: c.type_id,
      }));

      const contactsToSend = (() => {
        if (!isCreate) return contactsForBracket;

        const mainContactTypeId = contact_types.find((t) => t.name === "TODO")
          ?.id;
        const mainContact =
          mainContactTypeId != null
            ? {
                name: values.name ?? "",
                surname: values.surname ?? "",
                email: values.email ?? "",
                phone: values.mobile ?? "",
                type_id: mainContactTypeId,
              }
            : null;

        return mainContact != null
          ? [mainContact, ...contactsForBracket]
          : contactsForBracket;
      })();

      if (contactsToSend.length > 0) {
        appendContactsToFormData(formData, contactsToSend);
      }

      if (values.instagram?.trim()) {
        appendSocialMediaToFormData(formData, [
          {
            social_media_id: 1,
            account_name: values.instagram.trim(),
          },
        ]);
      }

      if (!deleteImageMode && file && file[0]) {
        formData.append("image", file[0]);
      }

      formData.delete("comments");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append("comments", (values as any)?.company_comments ?? "");
      formData.append("plan_id", formState.company_plan_id);

      let planPayload: CompanyPlanPayload | undefined;
      if (type === "edit") {
        COMPANY_PLAN_FORM_DATA_KEYS.forEach((key) => formData.delete(key));
        const [d, m, y] = formattedDate
          ? formattedDate.split("-")
          : ["", "", ""];
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

      const response = await onSubmit(
        formData,
        client && client?.id,
        planPayload,
      );

      const res = response as {
        success?: boolean;
        errors?: Record<string, string[] | string>;
        message?: string;
      };

      if (res?.success) {
        setIsOpen(false);
        setStatus(undefined);
        setErrors({});
      } else {
        const { fieldErrors, otherLabels } = splitLaravelErrorsForFormik(
          res.errors,
        );
        setErrors(fieldErrors);
        const hasLines = otherLabels.length > 0;
        const hasMsg = Boolean(res.message?.trim());
        if (hasLines || hasMsg) {
          setStatus({
            serverTitle:
              (hasMsg ? res.message : null) ?? "No se pudo guardar el cliente",
            serverLines: otherLabels,
          });
        } else if (Object.keys(fieldErrors).length > 0) {
          setStatus({
            serverTitle: "Revisa los campos indicados en el formulario.",
            serverLines: [],
          });
        } else {
          setStatus({
            serverTitle: "No se pudo guardar el cliente.",
            serverLines: [],
          });
        }
      }
    } catch {
      setStatus({
        serverTitle: "Error de red o del servidor",
        serverLines: [],
      });
    } finally {
      setSubmitting(false);
    }
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

  const initialValues: CompanyFormValues = {
    ...initialData,
    instagram:
      client?.socialMedia?.find((s) => s.name === "Instagram")?.account_name ||
      "",
    ...client,
    surname: client?.users?.[0]?.surname ?? "",
    mobile: (client as { mobile?: string } | undefined)?.mobile ?? "",
    plan_comments: client?.plan?.comments ?? "",
    plan: {
      ...client?.plan,
      start_date: convertDateToISO(client?.plan?.start_date?.slice(0, 10)),
    },
    terms: "",
  } as CompanyFormValues;

  return (
    <Formik<CompanyFormValues>
      initialValues={initialValues}
      validationSchema={type !== "edit" ? clientSchema : editClientSchema}
      onSubmit={handleSubmitForm}
    >
      {({
        errors,
        touched,
        handleSubmit,
        getFieldProps,
        isSubmitting,
        status,
        submitCount,
        setFieldError,
      }) => (
        <ReusableFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Cliente</h3>
          {isFormikServerAlertStatus(status) && (
            <div
              className="form-subsection"
              role="alert"
              style={{ color: theme.colors.red }}
            >
              <p className="form-subsection__error-message">
                {status.serverTitle}
              </p>
              {status.serverLines.length > 0 && (
                <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
                  {status.serverLines.map((line, idx) => (
                    <li key={`${idx}-${line}`}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
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

              {shouldShowFieldError(
                errors,
                touched,
                submitCount,
                "company",
              ) && (
                <span className="form-subsection__error-message" role="alert">
                  {fieldErrorMessage(errors, "company")}
                </span>
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

              {shouldShowFieldError(
                errors,
                touched,
                submitCount,
                "company_name",
              ) && (
                <span className="form-subsection__error-message" role="alert">
                  {fieldErrorMessage(errors, "company_name")}
                </span>
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
              {shouldShowFieldError(errors, touched, submitCount, "nif") && (
                <span className="form-subsection__error-message" role="alert">
                  {fieldErrorMessage(errors, "nif")}
                </span>
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
              {shouldShowFieldError(errors, touched, submitCount, "web") && (
                <span className="form-subsection__error-message" role="alert">
                  {fieldErrorMessage(errors, "web")}
                </span>
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
              {shouldShowFieldError(errors, touched, submitCount, "phone") && (
                <span className="form-subsection__error-message" role="alert">
                  {fieldErrorMessage(errors, "phone")}
                </span>
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
              {shouldShowFieldError(
                errors,
                touched,
                submitCount,
                "instagram",
              ) && (
                <span className="form-subsection__error-message" role="alert">
                  {fieldErrorMessage(errors, "instagram")}
                </span>
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
              {shouldShowFieldError(
                errors,
                touched,
                submitCount,
                "description",
              ) && (
                <span className="form-subsection__error-message" role="alert">
                  {fieldErrorMessage(errors, "description")}
                </span>
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
              {shouldShowFieldError(
                errors,
                touched,
                submitCount,
                "company_comments",
              ) && (
                <span className="form-subsection__error-message" role="alert">
                  {fieldErrorMessage(errors, "company_comments")}
                </span>
              )}
            </div>

            {type !== "edit" ? (
              <>
                <section className="lead-form__section">
                  <div className="datasheet-form__addresses">
                    {registerContacts &&
                      registerContacts.map((contact, index) => (
                        <section
                          key={`contact-${index}`}
                          className="lead-form__address"
                        >
                          <div>
                            <span>{contact.name}</span>
                            <span>{contact.surname}</span>
                          </div>
                          <span>{contact.email}</span>
                          <span>{contact.phone}</span>
                          <span>
                            {
                              contact_types.find(
                                (t: ContactType) => t.id === contact.type_id,
                              )?.name
                            }
                          </span>
                        </section>
                      ))}
                  </div>
                </section>
                <section className="lead-form__section">
                  <div className="lead-form__section-header">
                    <h4 className="lead-form__title">
                      Acceso principal a la plataforma
                    </h4>
                    <p className="lead-form__subtitle">
                      Estos datos se utilizarán para crear el acceso principal a
                      la plataforma y, a su vez, el contacto principal de la
                      empresa.
                    </p>
                  </div>
                  <div className="lead-form__section">
                    <div className="form-subsection">
                      <label htmlFor="name" className="form-subsection__label">
                        Nombre
                      </label>
                      <Field
                        type="text"
                        id="name"
                        className="lead-form__field"
                        aria-label="Nombre"
                        {...getFieldProps("name")}
                      />
                      {shouldShowFieldError(
                        errors,
                        touched,
                        submitCount,
                        "name",
                      ) && (
                        <span
                          className="form-subsection__error-message"
                          role="alert"
                        >
                          {fieldErrorMessage(errors, "name")}
                        </span>
                      )}
                    </div>
                    <div className="form-subsection">
                      <label
                        htmlFor="surname"
                        className="form-subsection__label"
                      >
                        Apellidos
                      </label>
                      <Field
                        type="text"
                        id="surname"
                        className="lead-form__field"
                        aria-label="Apellidos"
                        {...getFieldProps("surname")}
                      />
                      {shouldShowFieldError(
                        errors,
                        touched,
                        submitCount,
                        "surname",
                      ) && (
                        <span
                          className="form-subsection__error-message"
                          role="alert"
                        >
                          {fieldErrorMessage(errors, "surname")}
                        </span>
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
                      {shouldShowFieldError(
                        errors,
                        touched,
                        submitCount,
                        "email",
                      ) && (
                        <span
                          className="form-subsection__error-message"
                          role="alert"
                        >
                          {fieldErrorMessage(errors, "email")}
                        </span>
                      )}
                    </div>
                    <div className="form-subsection">
                      <label
                        htmlFor="mobile"
                        className="form-subsection__label"
                      >
                        Móvil
                      </label>
                      <Field
                        type="tel"
                        id="mobile"
                        className="lead-form__field"
                        aria-label="Móvil"
                        {...getFieldProps("mobile")}
                      />
                      {shouldShowFieldError(
                        errors,
                        touched,
                        submitCount,
                        "mobile",
                      ) && (
                        <span
                          className="form-subsection__error-message"
                          role="alert"
                        >
                          {fieldErrorMessage(errors, "mobile")}
                        </span>
                      )}
                    </div>
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
                        className="lead-form__field"
                        aria-label="Contraseña"
                        {...getFieldProps("password")}
                      />
                      {shouldShowFieldError(
                        errors,
                        touched,
                        submitCount,
                        "password",
                      ) && (
                        <span
                          className="form-subsection__error-message"
                          role="alert"
                        >
                          {fieldErrorMessage(errors, "password")}
                        </span>
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
                        aria-label="Repite contraseña"
                        {...getFieldProps("password_confirmation")}
                      />
                      {shouldShowFieldError(
                        errors,
                        touched,
                        submitCount,
                        "password_confirmation",
                      ) && (
                        <span
                          className="form-subsection__error-message"
                          role="alert"
                        >
                          {fieldErrorMessage(errors, "password_confirmation")}
                        </span>
                      )}
                    </div>
                  </div>
                </section>
                <section className="lead-form__section">
                  <div className="lead-form__section-header">
                    <h4 className="lead-form__title">
                      Contactos adicionales (opcional)
                    </h4>
                    <p className="lead-form__subtitle">
                      Si necesitan añadir otros contactos para facturación,
                      gestión o colaboraciones, pueden hacerlo aquí.
                    </p>
                  </div>
                  <div className="datasheet-form__contact-section">
                    <button
                      type="button"
                      className="datasheet-form__add-contact"
                      onClick={handleIsContactModalOpen}
                    >
                      {registerContacts.length > 0 ? (
                        <FaEdit className="datasheet-form__create--icon" />
                      ) : (
                        <IoAddCircle className="datasheet-form__create--icon" />
                      )}
                      {registerContacts.length > 0
                        ? "Modificar contacto"
                        : "Añadir contacto"}
                    </button>
                    {registerContacts.length > 0 && (
                      <span className="datasheet-form__contact-mssg">
                        <FaCheckCircle />
                        Contacto añadido
                      </span>
                    )}
                    {fieldErrorMessage(errors, "contacts") && (
                      <span
                        className="form-subsection__error-message"
                        role="alert"
                      >
                        {fieldErrorMessage(errors, "contacts")}
                      </span>
                    )}
                  </div>
                </section>
              </>
            ) : (
              <>
                <section className="lead-form__section">
                  <div className="datasheet-form__addresses">
                    {registerContacts &&
                      registerContacts.map((contact, index) => (
                        <section
                          key={`contact-edit-${index}`}
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
                                (t: ContactType) => t.id === contact.type_id,
                              )?.name
                            }
                          </span>
                        </section>
                      ))}
                  </div>
                </section>
                <section className="lead-form__section">
                  <div className="lead-form__section-header">
                    <h4 className="lead-form__title">
                      Contactos adicionales (opcional)
                    </h4>
                    <p className="lead-form__subtitle">
                      Si necesitan añadir otros contactos para facturación,
                      gestión o colaboraciones, pueden hacerlo aquí.
                    </p>
                  </div>
                  <div className="datasheet-form__contact-section">
                    <button
                      type="button"
                      className="datasheet-form__add-contact"
                      onClick={handleIsContactModalOpen}
                    >
                      {registerContacts.length > 0 ? (
                        <FaEdit className="datasheet-form__create--icon" />
                      ) : (
                        <IoAddCircle className="datasheet-form__create--icon" />
                      )}
                      {registerContacts.length > 0
                        ? "Modificar contacto"
                        : "Añadir contacto"}
                    </button>
                    {registerContacts.length > 0 && (
                      <span className="datasheet-form__contact-mssg">
                        <FaCheckCircle />
                        Contacto añadido
                      </span>
                    )}
                    {fieldErrorMessage(errors, "contacts") && (
                      <span
                        className="form-subsection__error-message"
                        role="alert"
                      >
                        {fieldErrorMessage(errors, "contacts")}
                      </span>
                    )}
                  </div>
                </section>
              </>
            )}

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
                    setHasTouchedPlan(true);
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
                {shouldShowFieldError(
                  errors,
                  touched,
                  submitCount,
                  "start_date",
                ) && (
                  <span className="form-subsection__error-message" role="alert">
                    {fieldErrorMessage(errors, "start_date")}
                  </span>
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
              {shouldShowFieldError(
                errors,
                touched,
                submitCount,
                "plan_comments",
              ) && (
                <span className="form-subsection__error-message" role="alert">
                  {fieldErrorMessage(errors, "plan_comments")}
                </span>
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
                    {shouldShowFieldError(
                      errors,
                      touched,
                      submitCount,
                      "password",
                    ) && (
                      <span
                        className="form-subsection__error-message"
                        role="alert"
                      >
                        {fieldErrorMessage(errors, "password")}
                      </span>
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
                    {shouldShowFieldError(
                      errors,
                      touched,
                      submitCount,
                      "password_confirmation",
                    ) && (
                      <span
                        className="form-subsection__error-message"
                        role="alert"
                      >
                        {fieldErrorMessage(errors, "password_confirmation")}
                      </span>
                    )}
                  </div>
                </>
              )}
          </div>
          {type !== "edit" ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  onChange={(e) => {
                    const next = e.target.checked;
                    setIsCheckedTerms(next);
                    if (next) {
                      setFieldError("terms", undefined);
                    }
                  }}
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
              {fieldErrorMessage(errors, "terms") && (
                <div
                  className="form-subsection"
                  role="alert"
                  style={{ width: "100%" }}
                >
                  <span className="form-subsection__error-message">
                    {fieldErrorMessage(errors, "terms")}
                  </span>
                </div>
              )}
            </>
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
