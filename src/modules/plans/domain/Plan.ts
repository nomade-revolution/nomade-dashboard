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
  start_payment_date: string | null;
  /**
   * Start of the current billing period (or first billing period start when
   * the plan is in trial / scheduled for the future).
   *
   * Format: "d-m-Y" (no time component). Backed by
   * Billing::computeBillingPeriodStart in nomade-back. Both
   * GET /api/companies/{id}/plan (CompanyPlanResource) and
   * GET /api/companies/{id}/status/info (CompanyInfoResource) expose it.
   */
  billing_period_start_date?: string | null;
}

export interface PlansApiResponse {
  companies: Plan[];
  pagination: PaginationStucture;
}

export interface PlanUpdateStructure {
  plan_id?: number;
  date: string;
  extension: number;
  comments?: string | null;
}
