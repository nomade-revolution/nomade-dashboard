import * as yup from "yup";

export const errorMessages = {
  required: "Este campo es obligatorio",
  invalidEmail: "Correo electrónico no válido",
  invalidPhone: "Número de teléfono no válido",
};

export const contactSchema = yup.object({
  name: yup.string().required(errorMessages.required),
  surname: yup.string().required(errorMessages.required),
  email: yup
    .string()
    .email(errorMessages.invalidEmail)
    .required(errorMessages.required),
  phone: yup
    .string()
    .required(errorMessages.required)
    .matches(/^\+?[0-9\s-]{7,15}$/, errorMessages.invalidPhone),
  type_id: yup.number().required(errorMessages.required),
});
