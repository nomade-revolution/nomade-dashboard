import { PartialCompany } from "@company";
import * as yup from "yup";

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
  description: yup.string().required("La descripción es un campo requerido"),
  phone: yup.string(),
  instagram: yup.string(),
  web: yup.string(),
  start_date: yup
    .string()
    .typeError("La fecha debe tener un formato válido")
    .nullable(),
});

export const initialData: PartialCompany = {
  nif: "",
  company: "",
  company_name: "",
  description: "",
  phone: "",
  instagram: "",
  web: "",
  start_date: "",
  email: "",
  password: "",
  password_confirmation: "",
  comments: "",
  plan_comments: "",
};
