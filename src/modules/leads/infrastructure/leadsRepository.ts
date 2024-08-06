import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { LeadsApiResponse } from "../domain/Leads";
import { LEADS_BASE } from "../application/routes";

export class LeadsRepository {
  private readonly http: Http = Http.getInstance();

  public async getLeads(
    page: number,
    per_page: number,
  ): Promise<HttpResponseInterface<LeadsApiResponse>> {
    try {
      const resp = await this.http.get<LeadsApiResponse>(LEADS_BASE, {
        page,
        per_page,
      });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
