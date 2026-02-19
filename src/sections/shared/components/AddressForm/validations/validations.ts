import * as yup from "yup";

export const errorMessages = {
  required: "Este campo es obligatorio",
  invalidPhone: "Número de teléfono no válido",
  invalidZipCode: "Código postal no válido",
  invalidCountryId: "El ID de país debe ser un número positivo",
};

export const addressSchema = yup.object({
  address: yup.string().required(errorMessages.required),
  address_2: yup.string().optional(),
  country_id: yup.number().required(errorMessages.required),
  city_id: yup.string().required(errorMessages.required),
  billing_city: yup.string().nullable().max(255).optional(),
  name: yup.string().optional(),
  province: yup.string().required(errorMessages.required),
  zip_code: yup
    .string()
    .required(errorMessages.required)
    .matches(/^\d{4,10}$/, errorMessages.invalidZipCode),
});
