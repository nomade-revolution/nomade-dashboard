import * as yup from "yup";

export const errorMessages = {
  required: "Este campo es obligatorio",
};

export const editInfluencerScheme = yup.object({
  name: yup.string().required(errorMessages.required),
  password: yup
    .string()
    .min(8, "La contraseña debe tener mínimo 8 carácteres")
    .required(errorMessages.required),
});
