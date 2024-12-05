import * as yup from "yup";

export const errorMessages = {
  required: "Este campo es obligatorio",
};

export const registerScheme = yup.object({
  name: yup.string().required(errorMessages.required),
  email: yup.string().required(errorMessages.required),
  password: yup
    .string()
    .min(8, "La contraseña debe tener mínimo 8 carácteres")
    .required(errorMessages.required),
  repeatPassword: yup
    .string()
    .required(errorMessages.required)
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});

export const loginScheme = yup.object({
  email: yup.string().required(errorMessages.required),
  password: yup.string().required(errorMessages.required),
});

export const recoverPasswordScheme = yup.object({
  email: yup.string().required(errorMessages.required),
});

export const registerInfluencerScheme = yup.object({
  name: yup.string().required(errorMessages.required),
  email: yup.string().required(errorMessages.required),
  password: yup
    .string()
    .min(8, "La contraseña debe tener mínimo 8 carácteres")
    .required(errorMessages.required),
  password_confirmation: yup
    .string()
    .required(errorMessages.required)
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});
