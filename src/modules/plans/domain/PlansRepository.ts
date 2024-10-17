import { HttpResponseInterface } from "@core";

export interface PlansRepository<I> {
  getCompaniesPlans(): Promise<HttpResponseInterface<I>>;
}
