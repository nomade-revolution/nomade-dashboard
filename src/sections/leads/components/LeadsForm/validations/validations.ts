import { FullAddress } from "modules/address/domain/Address";
import * as yup from "yup";

export const errorMessages = {
  required: "Este campo es obligatorio",
  invalidEmail: "Debe ser un correo electrónico válido",
  passwordMin: "La contraseña debe tener al menos 6 caracteres",
  passwordUpper: "Debe incluir al menos una mayúscula",
  passwordNumber: "Debe incluir al menos un número",
  passwordSpecial: "Debe incluir al menos un carácter especial",
  passwordMismatch: "Las contraseñas no coinciden",
};

export const leadsScheme = yup.object({
  email: yup
    .string()
    .required(errorMessages.required)
    .email(errorMessages.invalidEmail),

  nif: yup.string().required(errorMessages.required),
  company: yup.string().required(errorMessages.required),
  company_name: yup.string().required(errorMessages.required),
  phone: yup.string().required(errorMessages.required),
  web: yup.string(),
  description: yup.string(),
  image: yup.string(),
  hash: yup.string(),

  password: yup
    .string()
    .required(errorMessages.required)
    .min(6, errorMessages.passwordMin)
    .matches(/[A-Z]/, errorMessages.passwordUpper)
    .matches(/[0-9]/, errorMessages.passwordNumber)
    .matches(/[!@#$%^&*(),.?":{}|<>]/, errorMessages.passwordSpecial),

  password_confirmation: yup
    .string()
    .required(errorMessages.required)
    .oneOf([yup.ref("password")], errorMessages.passwordMismatch),
  contacts: yup.array().length(3, errorMessages.required),
  address: yup.object<FullAddress>(),
});
