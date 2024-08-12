import * as yup from "yup";

export const errorMessages = {
  required: "Este campo es obligatorio",
  invalidPhone: "Número de teléfono no válido",
  invalidZipCode: "Código postal no válido",
  invalidCountryId: "El ID de país debe ser un número positivo",
};

export const addressSchema = yup.object({
  address: yup.string().required(errorMessages.required),
  address_2: yup.string(),
  city_id: yup.string(),
  contact_name: yup.string().required(errorMessages.required),
  contact_phone: yup
    .string()
    .required(errorMessages.required)
    .matches(/^\+?[0-9\s-]{7,15}$/, errorMessages.invalidPhone),
  country_id: yup.number(),
  name: yup.string().required(errorMessages.required),
  province: yup.string().required(errorMessages.required),
  zip_code: yup
    .string()
    .required(errorMessages.required)
    .matches(/^\d{4,10}$/, errorMessages.invalidZipCode),
});
