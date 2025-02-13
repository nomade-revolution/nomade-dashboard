import { OfferTypes } from "modules/offers/domain/Offer";
import { OptionsStructure } from "sections/shared/interfaces/interfaces";

export const locationTypes: OptionsStructure[] = [
  {
    id: 1,
    name: "País",
    value: "App\\Models\\Country",
  },
  {
    id: 2,
    name: "Ciudad",
    value: "App\\Models\\City",
  },
];

export const categories: OptionsStructure[] = [
  { id: 1, name: "Restaurante", value: OfferTypes.restaurant },
  { id: 2, name: "Delivery", value: OfferTypes.delivery },
  { id: 3, name: "Moda", value: OfferTypes.brand },
  { id: 4, name: "Alojamiento", value: OfferTypes.lodging },
  { id: 5, name: "Bienestar", value: OfferTypes.activity },
];
