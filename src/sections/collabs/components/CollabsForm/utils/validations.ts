import { CollabsRequestStructure } from "modules/collabs/domain/Collabs";

import * as yup from "yup";

export const collabsRequestSchema = yup.object().shape({
  influencer_id: yup
    .number()
    .required("El ID del influencer es obligatorio")
    .positive("El ID del influencer debe ser un número positivo")
    .integer("El ID del influencer debe ser un número entero"),
  offer_id: yup
    .number()
    .required("El ID de la oferta es obligatorio")
    .positive("El ID de la oferta debe ser un número positivo")
    .integer("El ID de la oferta debe ser un número entero"),
  comment: yup
    .string()
    .required("El comentario es obligatorio")
    .max(500, "El comentario no debe exceder los 500 caracteres"),
});

export const initialData: CollabsRequestStructure = {
  collabable: {},
  influencer_id: 0,
  offer_id: 0,
  comment: "",
};
