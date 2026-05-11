import { CollabsRequestStructure } from "modules/collabs/domain/Collabs";

import * as yup from "yup";

export const collabsRequestSchema = yup.object().shape({
  comment: yup
    .string()
    .max(255, "Las observaciones no deben exceder los 255 caracteres")
    .optional(),
  note: yup
    .string()
    .max(255, "Las notas internas no deben exceder los 255 caracteres")
    .optional(),
});

export const initialData: CollabsRequestStructure = {
  collabable: {},
  influencer_id: "",
  offer_id: "",
  comment: "",
  note: "",
};
