import { Influencer } from "@influencer";
import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import { Address, FullAddress } from "modules/address/domain/Address";
import { Contact } from "modules/contact/domain/Contact";
import { Plan } from "modules/plans/domain/Plan";
import { PaginationStucture } from "sections/shared/interfaces/interfaces";

export interface User {
  id: number;
  name: string;
  email: string;
  type: "Company" | "Influencer" | "Nomade";
}

export interface Company extends User {
  nif: string;
  company: string;
  company_name: string;
  phone: string;
  web: string;
  description: string;
  image: string;
  socialMedia: SocialMedia[];
  user_id: number;
  address: Address;
  contacts: Array<
    Pick<Contact, "email" | "name" | "phone" | "surname"> & { type: string }
  >;
  percentage: number;
  plan: Pick<Plan, "billing"> & { plan_name: string; start_date: string };
}

export interface Account {
  name: string;
  owner: string;
  address: string;
}

export interface RegisterInfluencerFormStateStructure {
  name: string;
  surnames: string;
  phone: string;
  email: string;
  confirmEmail: string;
  password: string;
  password_confirmation: string;
  from_country_id: number;
  from_city_id: number;
  living_country_id: number;
  living_city_id: number;
  influencerType: string;
  socialMedia?: string;
  userName?: string;
  followers?: string;
  videoUrl?: string;
  LGPD?: boolean;
}

export interface Country {
  id: number;
  name: string;
  iso_2: string;
  iso_3: string;
}

export interface City {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  parent_id: number | null;
}

export enum UserTypes {
  influencer = "Influencer",
  company = "Company",
  nomade = "Nomade",
}

export interface UserApiResponse {
  users: User[] | Influencer[] | Company[];
  pagination: PaginationStucture;
}

export interface CompanyRegisterStructure {
  nif: string;
  company: string;
  company_name: string;
  phone: string;
  web: string;
  description: string;
  image: string;
  hash: string;
  email: string;
  password: string;
  password_confirmation: string;
  address: FullAddress;
}
