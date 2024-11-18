import { HttpResponseInterface } from "@core/domain";
import { PlansRepository } from "../domain/PlansRepository";
import { PlansApiResponse, PlanUpdateStructure } from "../domain/Plan";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export const getCompaniesPlans = (
  plansRepo: PlansRepository<PlansApiResponse>,
  page: number,
  per_page: number,
  filterParams?: FilterParams,
): Promise<HttpResponseInterface<PlansApiResponse>> => {
  return plansRepo.getCompaniesPlans(page, per_page, filterParams);
};

export const updateCompanyPlan = (
  plansRepo: PlansRepository<PlansApiResponse>,
  company_id: number,
  data: PlanUpdateStructure,
): Promise<HttpResponseInterface<PlansApiResponse>> => {
  return plansRepo.upadteCompanyPlan(company_id, data);
};
