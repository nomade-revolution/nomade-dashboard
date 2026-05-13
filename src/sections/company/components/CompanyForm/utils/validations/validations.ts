import { PartialCompany } from "@company";
import * as yup from "yup";

/** Form values for CompanyForm (extends API company fields with UI-only keys). */
export type CompanyFormValues = PartialCompany & {
  id?: number;
  surname?: string;
  mobile?: string;
  plan: { start_date?: string };
  company_comments?: string;
  image?: string;
  /** Client-side only: términos no aceptados al enviar */
  terms?: string;
  /** Set by submit validation / API mapping only; not a real input. */
  contacts?: string;
};

export const clientSchema = yup.object().shape({
  nif: yup
    .string()
    .required("El NIF es un campo requerido")
    .matches(
      /^[A-Za-z0-9]{8,9}$/,
      "El NIF debe ser de 8 - 9 caracteres alfanuméricos",
    ),
  company: yup.string().nullable(),
  company_name: yup.string().required("La razón social es un campo requerido"),
  description: yup.string().required("La descripción es un campo requerido"),
  phone: yup.string(),
  instagram: yup.string(),
  web: yup.string(),
  start_date: yup
    .string()
    .typeError("La fecha debe tener un formato válido")
    .nullable(),

  company_comments: yup.string(),

  name: yup.string().required("El nombre es un campo requerido"),
  surname: yup.string().max(255, "Máximo 255 caracteres"),
  email: yup.string().required("El email es un campo requerido").email(),
  mobile: yup.string().max(50, "Máximo 50 caracteres"),
  password: yup
    .string()
    .min(8, "Debe contener almenos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
    .matches(/[a-z]/, "Debe contener almenos una minuscula")
    .matches(/[0-9]/, "Debe contener almenos un número")
    .matches(
      /[!@#$%^&*(),-.?":{}|<>_]/,
      "Debe contener almenos un carácter especial",
    ),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir"),

  terms: yup.string().nullable(),
  contacts: yup.string().nullable(),
});

export const editClientSchema = yup.object().shape({
  nif: yup
    .string()
    .required("El NIF es un campo requerido")
    .matches(
      /^[A-Za-z0-9]{8,9}$/,
      "El NIF debe ser de 8 - 9 caracteres alfanuméricos",
    ),
  company: yup.string().nullable(),
  company_name: yup.string().required("La razón social es un campo requerido"),
  description: yup.string().nullable(),
  phone: yup.string(),
  instagram: yup.string(),
  web: yup.string(),
  start_date: yup
    .string()
    .typeError("La fecha debe tener un formato válido")
    .nullable(),
  surname: yup.string().max(255, "Máximo 255 caracteres"),
  mobile: yup.string().max(50, "Máximo 50 caracteres"),
  company_comments: yup.string(),
  terms: yup.string().nullable(),
  contacts: yup.string().nullable(),
});

export const initialData: CompanyFormValues = {
  nif: "",
  company: "",
  company_name: "",
  description: "",
  phone: "",
  instagram: "",
  web: "",
  start_date: "",
  name: "",
  surname: "",
  email: "",
  mobile: "",
  password: "",
  password_confirmation: "",
  comments: "",
  plan_comments: "",
  company_comments: "",
  plan: { start_date: "" },
  image: "",
  terms: "",
};
