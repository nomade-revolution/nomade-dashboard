import { OfferFormStructure } from "modules/offers/domain/Offer";
import * as yup from "yup";

// const timeSlotSchema = yup.object().shape({
//   from_time: yup.string().required("From time is required"),
//   to_time: yup.string().required("To time is required"),
// });

// const weekSchema = yup.array().of(
//   yup.object().shape({
//     day_of_week: yup
//       .number()
//       .min(1)
//       .max(7)
//       .required("Day of the week is required"),
//     time_slot: yup
//       .array()
//       .of(timeSlotSchema)
//       .required("Time slots are required"),
//   }),
// );

// const offerableRestaurantSchema = yup.array().of(
//   yup.object().shape({
//     address_id: yup.number().required("Address ID is required"),
//     min_guests: yup.number().min(1).required("Minimum guests is required"),
//     max_guests: yup.number().min(1).required("Maximum guests is required"),
//     week: weekSchema.required("Week schedule is required"),
//   }),
// );

// const offerableLodgingSchema = yup.object().shape({
//   address_id: yup.number().required("Address ID is required"),
//   min_guests: yup.number().min(1).required("Minimum guests is required"),
//   max_guests: yup.number().min(1).required("Maximum guests is required"),
// });

// const offerableActivitySchema = yup.array().of(
//   yup.object().shape({
//     address_id: yup.number().required("Address ID is required"),
//     min_guests: yup.number().min(1).required("Minimum guests is required"),
//     max_guests: yup.number().min(1).required("Maximum guests is required"),
//     week: weekSchema.required("Week schedule is required"),
//   }),
// );

// const offerableDeliverySchema = yup.object().shape({
//   advance_notice_time: yup
//     .number()
//     .min(1)
//     .required("Advance notice time is required"),
//   week: weekSchema.required("Week schedule is required"),
// });

// const offerableBrandSchema = yup.object().shape({
//   advance_notice_time: yup
//     .number()
//     .min(1)
//     .required("Advance notice time is required"),
// });

export const offerSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  conditions: yup.string().required("Conditions are required"),
  in_exchange: yup.string().required("In exchange is required"),
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
  offerable: {},
  offerable_type: "",
};
