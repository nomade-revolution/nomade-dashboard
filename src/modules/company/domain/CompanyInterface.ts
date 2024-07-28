import { SocialMediaInterface } from "@socialMedia";

export interface CompanyInterface {
  id: number;
  nif: string;
  company: string;
  company_name: string;
  phone: string;
  web: string;
  description: string;
  percentage?: number;
  image: string;
  socialMedia?: SocialMediaInterface;
  plan?: string;
  address?: string;
}
