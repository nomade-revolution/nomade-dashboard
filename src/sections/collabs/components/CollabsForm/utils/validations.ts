import { CollabsRequestStructure } from "modules/collabs/domain/Collabs";

import * as yup from "yup";

export const collabsRequestSchema = yup.object().shape({
  comment: yup
    .string()
    .required("El comentario es obligatorio")
    .max(500, "El comentario no debe exceder los 500 caracteres"),
});

export const initialData: CollabsRequestStructure = {
  collabable: {},
  influencer_id: "",
  offer_id: "",
  comment: "",
  note: "",
};
