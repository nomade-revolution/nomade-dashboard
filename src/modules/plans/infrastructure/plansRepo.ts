import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { Plan } from "../domain/Plan";
import { COMPANIES_PLANS } from "../application/routes";

export class PlansRepository {
  private readonly http: Http = Http.getInstance();

  public async getCompaniesPlans(): Promise<HttpResponseInterface<Plan[]>> {
    try {
      const resp = await this.http.get<Plan[]>(`${COMPANIES_PLANS}`);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
