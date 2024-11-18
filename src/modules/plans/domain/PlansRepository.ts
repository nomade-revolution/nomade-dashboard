import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import { PlanUpdateStructure } from "./Plan";

export interface PlansRepository<I> {
  getCompaniesPlans(
    page: number,
    per_page: number,
    filterParams?: FilterParams,
  ): Promise<HttpResponseInterface<I>>;
  updateCompanyPlan(
    company_id: number,
    data: PlanUpdateStructure,
  ): Promise<HttpResponseInterface<I>>;
}
