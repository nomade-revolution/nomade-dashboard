import { PaginationStucture } from "sections/shared/interfaces/interfaces";

export interface Lead {
  id: number;
  company_name: string;
  contact_name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
  link_sent: boolean;
}

export interface LeadsApiResponse {
  leads: Lead[];
  pagination: PaginationStucture;
}
