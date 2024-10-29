import { PaginationStucture } from "sections/shared/interfaces/interfaces";

export interface Plan {
  id: number;
  company: string;
  company_name: string;
  plan: string;
  objective: number;
  minimum: number;
  billing: string;
  colabs: number;
  percentage: number;
  remaining: string;
  start_date: string | null;
  end_date: string | null;
}

export interface PlansApiResponse {
  companies: Plan[];
  pagination: PaginationStucture;
}
