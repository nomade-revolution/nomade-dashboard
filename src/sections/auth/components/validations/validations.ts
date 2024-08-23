import * as yup from "yup";

export const errorMessages = {
  required: "Este campo es obligatorio",
};

export const loginScheme = yup.object({
  email: yup.string().required(errorMessages.required),
  password: yup.string().required(errorMessages.required),
});

export const recoverPasswordScheme = yup.object({
  email: yup.string().required(errorMessages.required),
});
