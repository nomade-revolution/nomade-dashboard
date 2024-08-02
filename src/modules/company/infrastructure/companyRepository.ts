import { COMPANY_BASE } from "@company/application/routes";
import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";

export class CompanyRepository {
  private readonly http: Http = Http.getInstance();

  public async deleteCompany(
    user_id: number,
  ): Promise<HttpResponseInterface<{ success: boolean }>> {
    try {
      const resp = await this.http.delete<{ success: boolean }>(
        `${COMPANY_BASE}/${user_id}`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
