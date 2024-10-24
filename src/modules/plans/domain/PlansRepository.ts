import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export interface PlansRepository<I> {
  getCompaniesPlans(
    page: number,
    per_page: number,
    filterParams?: FilterParams,
  ): Promise<HttpResponseInterface<I>>;
}
