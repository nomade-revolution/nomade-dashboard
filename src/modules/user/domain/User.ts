import { Influencer } from "@influencer";
import { FullAddress } from "modules/address/domain/Address";
import { Contact } from "modules/contact/domain/Contact";
import { Plan } from "modules/plans/domain/Plan";
import { PaginationStucture } from "sections/shared/interfaces/interfaces";

export interface User {
  id: number;
  name: string;
  surname?: string;
  email: string;
  type: "Company" | "Influencer" | "Nomade" | "users_app";
  roles: number[];
  user_id?: number;
  companies?: Company[];
}

export interface Company extends User {
  nif: string;
  company: string;
  company_name: string;
  phone: string;
  web: string;
  description: string;
  image: string;
  socialMedia: CompanySocialMedia[];
  user_id: number;
  address: FullAddress;
  contacts: Array<
    Pick<Contact, "email" | "name" | "phone" | "surname"> & {
      type: string;
      type_id: number;
    }
  >;
  percentage: number;
  plan: Pick<Plan, "billing" | "start_date"> & {
    plan_name: string;
    plan_id: number;
    comments: string;
  };
  goCardless: number;
  status: string;
  company_comments: string;
  offer_id?: number;
}

export interface CompanySocialMedia {
  id: number;
  name: string;
  url: string;
  account_name: string;
  followers?: number;
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
  infleuncerCompany = "InfluencerCompany",
}

export interface UserApiResponse {
  users: User[] | Influencer[] | Company[];
  pagination: PaginationStucture;
}

export interface CompaniesApiResponse {
  companies: Company[];
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
  contacts?: [];
  name?: string;
  surname?: string;
}

export interface UserRol {
  id: number;
  name: string;
}
