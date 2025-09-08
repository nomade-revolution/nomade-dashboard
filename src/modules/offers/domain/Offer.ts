import { PaginationStucture } from "sections/shared/interfaces/interfaces";
import { Calendar } from "./OfferCalendar";
import { ImageStructure } from "./OfferImage";
import { Address } from "modules/address/domain/Address";

export interface Offer {
  id?: number;
  images: ImageStructure[];
  company: string;
  company_id: number;
  description: string;
  offer_categories: {
    id: number;
    name: string;
  }[];
  type: OfferTypes;
  in_exchange: string;
  conditions: string;
  advance_notice_time: number | null;
  favorite: boolean;
  reserves?: number;
  active: boolean;
  calendar: Calendar[] | Calendar;
  user_id: number;
}

export interface FullOffer extends Offer {
  description: string;
  conditions: string;
  in_exchange: string;
  offer_categories: {
    id: number;
    name: string;
  }[];
  addresses: Address[];
  images: ImageStructure[];
  limitDate: string;
  offerable_type: string;
  location_type: string;
  location_id: number;
  location_parent_id?: number;
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
  | "offer_categories"
  | "active"
  | "offerable_type"
  | "images"
>;

export interface TimeSlot {
  from_time: string;
  to_time: string;
}

export interface WeekDay {
  day_name: string;
  day_of_week: number;
  time_slot: {
    from_time: string;
    to_time: string;
  };
  time_slots: TimeSlot[];
}

export interface OfferableRestaurant {
  type?: string;
  address_id: number;
  min_guests: number;
  max_guests: number;
  week: WeekDay[][];
}

export interface OfferableLodging {
  type?: string;
  address_id: number;
  min_guests: number;
  max_guests: number;
}

export interface OfferableActivity {
  type?: string;
  address_id: number;
  min_guests: number;
  max_guests: number;
  week: WeekDay[][];
}

export interface OfferableDelivery {
  type?: string;
  advance_notice_time: number;
  week: WeekDay[][];
}

export interface OfferableBrand {
  type?: string;
  advance_notice_time: number;
}

export interface OfferFormStructure {
  description: string;
  conditions: string;
  in_exchange: string;
  type: OfferTypes | string;
  categories: number[];
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

export interface SelectedDay {
  day_number: number;
  day_name: string;
  shifts: {
    firstShift: { from_time: string; to_time: string };
    secondShift: { from_time: string; to_time: string };
  };
}

export const enum OfferTypes {
  restaurant = "Restaurant",
  activity = "Activity",
  lodging = "Lodging",
  delivery = "Delivery",
  brand = "Brand",
}

// export interface ActivityOffer extends Offer {
//   calendar: Calendar[];
// }
// export interface BrandOffer extends Offer {}
// export interface DeliveryOffer extends Offer {
//   calendar: CalendarWithWeeks;
// }
// export interface LodgingOffer extends Offer {
//   addresses: Address[];
// }
// export interface RestaurantOffer extends Offer {
//   calendar: Calendar[];
// }
