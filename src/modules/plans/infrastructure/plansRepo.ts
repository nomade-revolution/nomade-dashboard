import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { Plan, PlansApiResponse } from "../domain/Plan";
import { COMPANIES_PLANS } from "../application/routes";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export class PlansRepository {
  private readonly http: Http = Http.getInstance();

  public async getCompaniesPlans(
    page: number,
    per_page: number,
    filterParams?: FilterParams,
  ): Promise<HttpResponseInterface<PlansApiResponse>> {
    try {
      const resp = await this.http.get<Plan[]>(`${COMPANIES_PLANS}`, {
        page,
        per_page,
        ...filterParams,
      });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
