import { COMPANY_BASE } from "@company/application/routes";
import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { Company } from "modules/user/domain/User";

export class CompanyRepository {
  private readonly http: Http = Http.getInstance();

  public async deleteCompany(
    company_id: number,
  ): Promise<HttpResponseInterface<{ success: boolean }>> {
    try {
      const resp = await this.http.delete<{ success: boolean }>(
        `${COMPANY_BASE}/${company_id}`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getCompanyById(
    company_id: number,
  ): Promise<HttpResponseInterface<Company>> {
    try {
      const resp = await this.http.get<Company>(
        `${COMPANY_BASE}/${company_id}`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
