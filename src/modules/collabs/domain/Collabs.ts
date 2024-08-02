import { InfluencerInterface } from "@influencer";
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
}

export interface FullCollab extends Collab {
  influencer: InfluencerInterface;
  address: string;
  history: State[];
  influencer_name: string;
  influencer_id: number;
}

export interface State {
  id: number;
  name: string;
  created_at: string;
  type: string;
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
  offer_id: number;
  influencer_id: number;
  comment?: string;
  collabable: CollabableRestaurant | CollabableDelivery | CollabableBrand;
}

export interface RejectedCollab {
  id: number;
  name: string;
}

export enum CollabTypes {
  restaurant = "Restaurant",
  lodging = "Lodging",
  brand = "Brand",
  delivery = "Delivery",
  activity = "Activity",
}
