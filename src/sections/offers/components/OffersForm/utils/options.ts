import {
  BRAND_OFFER_ID,
  DELIVERY_OFFER_ID,
  LODGING_OFFER_ID,
  RESTAURANT_OFFER_ID,
  ACTIVITY_OFFER_ID,
} from "sections/offers/utils/offersCategories";
import { OptionsStructure } from "sections/shared/interfaces/interfaces";

export const locationTypes: OptionsStructure[] = [
  {
    id: 1,
    name: "País",
    value: "App/Models/Country",
  },
  {
    id: 2,
    name: "Ciudad",
    value: "App/Models/City",
  },
];

export const categories: OptionsStructure[] = [
  { id: 1, name: "Restaurante", value: RESTAURANT_OFFER_ID },
  { id: 2, name: "Delivery", value: DELIVERY_OFFER_ID },
  { id: 3, name: "Moda", value: BRAND_OFFER_ID },
  { id: 4, name: "Alojamiento", value: LODGING_OFFER_ID },
  { id: 5, name: "Bienestar", value: ACTIVITY_OFFER_ID },
];
