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
}

export interface PlansApiResponse {
  plans: Plan[];
  pagination: PaginationStucture;
}
