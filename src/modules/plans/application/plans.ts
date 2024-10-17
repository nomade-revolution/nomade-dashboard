import { HttpResponseInterface } from "@core/domain";
import { PlansRepository } from "../domain/PlansRepository";
import { Plan } from "../domain/Plan";

export const getCompaniesPlans = (
  plansRepo: PlansRepository<Plan[]>,
): Promise<HttpResponseInterface<Plan[]>> => {
  return plansRepo.getCompaniesPlans();
};
