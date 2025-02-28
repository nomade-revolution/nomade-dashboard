import { CountryInterface } from "@country/domain";
import { CityInterface } from "@city/domain";
import { SocialMedia } from "./InfluencerSocialMedia";
import { Category } from "modules/user/domain/User";

export interface Influencer {
  id: number;
  name: string;
  surnames: string;
  user_name: string;
  gender?: string;
  prefix: string;
  phone: string;
  from_country?: CountryInterface;
  from_city?: CityInterface;
  living_country?: CountryInterface;
  living_city?: CityInterface;
  categories: Category[];
  LGPD: string;
  avatar: string;
  socialMedia: SocialMedia[];
  new: boolean;
  email: string;
  state: { id: number; name: string };
  influencer_state_id?: number;
  created_at: string;
}
