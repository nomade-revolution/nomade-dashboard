import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { Plan, PlansApiResponse, PlanUpdateStructure } from "../domain/Plan";
import { COMPANIES_PLAN_UPDATE, COMPANIES_PLANS } from "../application/routes";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export class PlansRepository {
  private readonly http: Http = Http.getInstance();

  public async getCompaniesPlans(
    page: number,
    per_page: number,
    filterParams?: FilterParams,
  ): Promise<HttpResponseInterface<PlansApiResponse>> {
    try {
      const resp = await this.http.get<Plan[]>(COMPANIES_PLANS, {
        page,
        per_page,
        ...filterParams,
      });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateCompanyPlan(
    company_id: number,
    data: PlanUpdateStructure,
  ): Promise<HttpResponseInterface<boolean>> {
    try {
      const resp = await this.http.put<boolean>(
        `${COMPANIES_PLAN_UPDATE(company_id)}`,
        data,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
