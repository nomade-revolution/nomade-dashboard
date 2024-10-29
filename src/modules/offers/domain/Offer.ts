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

export interface TimeSlot {
  from_time: string;
  to_time: string;
}

export interface WeekDay {
  day_of_week: number;
  time_slot: TimeSlot[];
}

export interface OfferableRestaurant {
  address_id: number;
  min_guests: number;
  max_guests: number;
  week: WeekDay[];
}

export interface OfferableLodging {
  address_id: number;
  min_guests: number;
  max_guests: number;
}

export interface OfferableActivity {
  address_id: number;
  min_guests: number;
  max_guests: number;
  week: WeekDay[];
}

export interface OfferableDelivery {
  advance_notice_time: number;
  week: WeekDay[];
}

export interface OfferableBrand {
  advance_notice_time: number;
}

export interface OfferFormStructure {
  description: string;
  conditions: string;
  in_exchange: string;
  offer_category_id: number;
  company_id: number;
  active: boolean;
  offerable_type:
    | "OfferableRestaurant"
    | "OfferableLodging"
    | "OfferableActivity"
    | "OfferableDelivery"
    | "OfferableBrand"
    | string;
  location_id: number;
  location_type: "App\\Models\\Country" | "App\\Models\\City" | string;
  images: string[];
  offerable:
    | OfferableRestaurant
    | OfferableLodging
    | OfferableActivity
    | OfferableDelivery
    | OfferableBrand
    | Record<string, unknown>;
}
