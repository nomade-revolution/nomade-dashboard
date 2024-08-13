import * as yup from "yup";

export const errorMessages = {
  required: "Este campo es obligatorio",
};

export const dataSheetScheme = yup.object({
  name: yup.string().required(errorMessages.required),
  surname: yup.string().required(errorMessages.required),
  email: yup.string().required(errorMessages.required),
  password: yup.string().required(errorMessages.required),
  c_password: yup.string().required(errorMessages.required),
  phone: yup.string().required(errorMessages.required),
  role: yup.string().required(errorMessages.required),
});
