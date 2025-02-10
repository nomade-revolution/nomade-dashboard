import { PartialCompany } from "@company";
import * as yup from "yup";

export const clientSchema = yup.object().shape({
  nif: yup
    .string()
    .matches(
      /^[A-Za-z0-9]{8,9}$/,
      "El NIF debe ser de 8 - 9 caracteres alfanuméricos",
    )
    .nullable(),
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

  password: yup
    .string()
    .min(8, "Debe contener almenos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
    .matches(/[a-z]/, "Debe contener almenos una minuscula")
    .matches(/[0-9]/, "Debe contener almenos un número")
    .matches(
      /[!@#$%^&*(),.?":{}|<>_]/,
      "Debe contener almenos un carácter especial",
    ),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir"),
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
