import * as yup from "yup";

export const errorMessages = {
  required: "Este campo es obligatorio",
};

export const leadsScheme = yup.object({
  email: yup.string().required(errorMessages.required),
  nif: yup.string().required(errorMessages.required),
  company: yup.string().required(errorMessages.required),
  company_name: yup.string().required(errorMessages.required),
  phone: yup.string().required(errorMessages.required),
  web: yup.string(),
  description: yup.string(),
  image: yup.string(),
  hash: yup.string(),
  password: yup.string().required(errorMessages.required),
  password_confirmation: yup.string().required(errorMessages.required),
  address: yup.object(),
});
