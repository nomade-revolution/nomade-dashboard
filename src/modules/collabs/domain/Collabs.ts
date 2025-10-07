import { Influencer } from "@influencer";
import { PaginationStucture } from "sections/shared/interfaces/interfaces";

export interface Collab {
  id: number;
  company: string;
  day: string;
  time: string;
  guests: number;
  type: string;
  comment?: string;
  from_day?: string;
  to_day?: string;
  company_id: number;
  state: {
    created_at: string;
    id: number;
    name: string;
    type: string;
  };
}

export interface FullCollab extends Collab {
  influencer: Influencer;
  address: string;
  history: State[];
  influencer_name: string;
  influencer_id: number;
  offer_id: number;
  addresses_id: number;
  conditions: string;
  note: string | null;
  company_notes?: string; // API typo - keeping both for compatibility
}

export interface State {
  id: number;
  name: string;
  created_at: string;
  type: string;
  limit_date?: string;
}

export interface CollabsApiResponse {
  colabs: FullCollab[];
  pagination: PaginationStucture;
}

interface CollabableRestaurant {
  address_id: number;
  guests: number;
  day: string;
  time: string;
}
interface CollabableDelivery {
  day: string;
  time: string;
}
interface CollabableBrand {}

export interface CollabsRequestStructure {
  offer_id: string;
  influencer_id: string;
  comment?: string;
  note?: string;
  collabable: CollabableRestaurant | CollabableDelivery | CollabableBrand;
}

export interface RejectedCollab {
  id: number;
  name: string;
  need_reason_text?: boolean;
  reason_text_placeholder?: string;
}

export enum CollabTypes {
  restaurant = "Restaurant",
  lodging = "Lodging",
  brand = "Brand",
  delivery = "Delivery",
  activity = "Activity",
}

export enum CollabActionTypes {
  accept = "accept",
  refuse = "refuse",
  cancel = "cancel",
  modifyState = "modifyState",
  modifyStateWithNotes = "modifyStateWithNotes",
  sendPackage = "sendPackage",
}

export const enum CollabType {
  company = "Company",
  nomade = "Nomade",
  influencer = "Influencer",
}

export interface CollabCollabableCreateDefault {
  address_id: number;
  guests: number;
  day: string;
  time: string;
}

export interface CollabCollabableCreateLodging {
  address_id: number;
  guests: number;
  from_day: string;
  to_day: string;
}

export interface CollabCollabableCreateDelivery {
  day: string;
  time: string;
}

export interface UpdateCollabNotesPayload {
  company_notes: string; // Using API field name (with typo)
}
