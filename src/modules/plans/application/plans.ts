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
  plansRepo: PlansRepository<boolean>,
  company_id: number,
  data: PlanUpdateStructure,
): Promise<HttpResponseInterface<boolean>> => {
  return plansRepo.updateCompanyPlan(company_id, data);
};
export const getPlanByUserId = (
  plansRepo: PlansRepository<PlansApiResponse>,
  id: number,
): Promise<HttpResponseInterface<PlansApiResponse>> => {
  return plansRepo.getPlanByUserId(id);
};
