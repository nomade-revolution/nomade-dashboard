import { OfferFormStructure } from "modules/offers/domain/Offer";
import * as yup from "yup";

export const offerSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  conditions: yup.string().required("Conditions are required"),
  in_exchange: yup.string().required("In exchange is required"),
  advance_notice_time: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      // Transform null, undefined, or empty string to 0
      return originalValue == null || originalValue === "" ? 0 : value;
    })
    .min(0),
});

export const initialData: OfferFormStructure = {
  company_id: 0,
  type: "",
  description: "",
  categories: [],
  in_exchange: "",
  conditions: "",
  images: [],
  active: false,
  location_id: 0,
  location_type: "",
  advance_notice_time: 0,
  offerable: {},
  offerable_type: "",
};
