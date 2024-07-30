import { PaginationStucture } from "sections/shared/interfaces/interfaces";
import { Calendar, CalendarWithWeeks } from "./OfferCalendar";
import { ImageStructure } from "./OfferImage";
import { Address } from "./OfferrAddress";

export type OfferType =
  | "Activity"
  | "Brand"
  | "Delivery"
  | "Lodging"
  | "Restaurant";
export interface Offer {
  id: number;
  images: ImageStructure[];
  company: string;
  company_id: number;
  description: string;
  offer_category_id: number;
  type: OfferType;
  in_exchange: string;
  conditions: string;
  advance_notice_time: number | null;
  favorite: boolean;
}

export interface ActivityOffer extends Offer {
  calendar: Calendar[];
}
export interface BrandOffer extends Offer {}
export interface DeliveryOffer extends Offer {
  calendar: CalendarWithWeeks;
}
export interface LodgingOffer extends Offer {
  addresses: Address[];
}
export interface RestaurantOffer extends Offer {
  calendar: Calendar[];
}

export interface FullOffer extends Offer {
  description: string;
  conditions: string;
  in_exchange: string;
  offer_category_id: number;
  calendar: Calendar[];
  addresses: Address[];
  images: ImageStructure[];
  limitDate: string;
}

export interface OffersApiResponse {
  offers: FullOffer[];
  pagination: PaginationStucture;
}

export interface FavsOffersApiResponse {
  offers: FullOffer[];
  pagination: PaginationStucture;
}
