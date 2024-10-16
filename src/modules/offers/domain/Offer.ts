import { PaginationStucture } from "sections/shared/interfaces/interfaces";
import { Calendar, CalendarWithWeeks } from "./OfferCalendar";
import { ImageStructure } from "./OfferImage";
import { Address } from "modules/address/domain/Address";

export type OfferType =
  | "Activity"
  | "Brand"
  | "Delivery"
  | "Lodging"
  | "Restaurant";
export interface Offer {
  id?: number;
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
  reserves?: number;
  active: boolean;
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
  offerable_type: string;
}

export interface OffersApiResponse {
  offers: FullOffer[];
  pagination: PaginationStucture;
}

export interface FavsOffersApiResponse {
  offers: FullOffer[];
  pagination: PaginationStucture;
}

export type PartialOffer = Pick<
  FullOffer,
  | "company_id"
  | "description"
  | "conditions"
  | "in_exchange"
  | "offer_category_id"
  | "active"
  | "offerable_type"
  | "images"
>;

export interface OfferFormStructure extends PartialOffer {
  location_id: number;
  location_type: string;
  offerable: object;
}
