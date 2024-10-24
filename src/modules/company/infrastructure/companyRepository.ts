import { COMPANY_BASE } from "@company/application/routes";
import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { Company } from "modules/user/domain/User";
import { FilterParams } from "sections/shared/interfaces/interfaces";

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

  public async registerCompany(
    company: FormData,
  ): Promise<HttpResponseInterface<Company>> {
    try {
      const resp = await this.http.post<Company>(
        `${COMPANY_BASE}/register`,
        company,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getCompaniesBadge(): Promise<HttpResponseInterface<number>> {
    try {
      const resp = await this.http.get<number>(`${COMPANY_BASE}/status/badge`);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getCompanies(
    filters: FilterParams,
  ): Promise<HttpResponseInterface<Company>> {
    try {
      const resp = await this.http.get<Company>(COMPANY_BASE, {
        ...filters,
      });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
