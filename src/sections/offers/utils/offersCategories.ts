import { OptionsStructure } from "sections/shared/interfaces/interfaces";

export const RESTAURANT_OFFER_ID = 1;
export const DELIVERY_OFFER_ID = 5;
export const BRAND_OFFER_ID = 6;
export const LODGING_OFFER_ID = 7;
export const WELLNES_OFFER_ID = 8;

export const offersCategories: OptionsStructure[] = [
  { id: 1, name: "Restaurant", value: RESTAURANT_OFFER_ID },
  { id: 2, name: "Delivery", value: DELIVERY_OFFER_ID },
  { id: 3, name: "Marca", value: BRAND_OFFER_ID },
  { id: 4, name: "Alojamientos", value: LODGING_OFFER_ID },
  { id: 5, name: "Bienestar", value: WELLNES_OFFER_ID },
];
