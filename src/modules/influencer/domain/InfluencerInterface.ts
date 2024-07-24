import { CountryInterface } from "@country/domain";
import { CityInterface } from "@city/domain";
import { SocialMediaInterface } from "@socialMedia/domain";

export interface InfluencerInterface {
  name: string;
  surnames: string;
  user_name: string;
  prefix: string;
  phone: string;
  from_country?: CountryInterface;
  from_city?: CityInterface;
  living_country?: CountryInterface;
  living_city?: string;
  categories?: string;
  LGPD: string;
  avatar: string;
  socialMedia?: SocialMediaInterface;
}
