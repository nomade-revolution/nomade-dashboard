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

interface Country {
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

export interface SocialMedia {
  id: number;
  name: string;
  url: string;
  account_name: string;
  followers: number;
}

export interface Influencer extends User {
  surnames: string;
  user_name: string;
  prefix: string;
  phone: string;
  from_country: Country;
  from_city: City;
  living_country: Country;
  living_city: City;
  categories: Category[];
  LGPD: number;
  avatar: string;
  socialMedia: SocialMedia[];
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
