import { SocialMediaInterface } from "@socialMedia";

export interface CompanyInterface {
  id?: number;
  nif: string;
  company: string;
  company_name: string;
  phone: string;
  web: string;
  description: string;
  percentage?: number;
  image: string | File;
  socialMedia?: SocialMediaInterface;
  plan?: string;
  address?: string;
}

export type PartialCompany = Pick<
  CompanyInterface,
  "company" | "company_name" | "description" | "nif" | "web" | "phone"
> & {
  start_date: string;
  email: string;
  password: string;
  password_confirmation: string;
  comments: string;
  plan_comments: string;
};
