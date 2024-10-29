import { HttpResponseInterface } from "@core/domain";
import { PlansRepository } from "../domain/PlansRepository";
import { PlansApiResponse } from "../domain/Plan";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export const getCompaniesPlans = (
  plansRepo: PlansRepository<PlansApiResponse>,
  page: number,
  per_page: number,
  filterParams?: FilterParams,
): Promise<HttpResponseInterface<PlansApiResponse>> => {
  return plansRepo.getCompaniesPlans(page, per_page, filterParams);
};
