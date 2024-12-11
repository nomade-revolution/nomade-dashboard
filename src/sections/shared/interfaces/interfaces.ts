import { IconType } from "react-icons";

export interface HeaderSection {
  id: number;
  name: string;
  property: string;
  sortTag: string | null;
  pageName: string;
}

export interface PaginationStucture {
  current_page: number;
  last_page: number;
  per_page: number;
}

export enum SectionTypes {
  customers = "clientes",
  users = "usuarios",
  offers = "ofertas",
  influencers = "influencers",
  collabs = "collabs",
  leads = "leads",
  categories = "categories",
  collabsReservations = "collabs-reservations",
  plans = "planes",
}

export interface OptionsStructure {
  id: number;
  value: string | number;
  name: string;
}

export type FilterParams = { [key: string]: unknown };

export interface DropdownOption {
  id: number;
  name: string;
  icon: IconType;
  isVisible: boolean;
}
