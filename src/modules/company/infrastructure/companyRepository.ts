import {
  COMPANY_BASE,
  COMPANY_CMS_REGISTER,
} from "@company/application/routes";
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
    params: FilterParams,
  ): Promise<HttpResponseInterface<Company[]>> {
    try {
      const resp = await this.http.get<Company[]>(COMPANY_BASE, params);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async postNewCompany(
    company: FormData,
  ): Promise<HttpResponseInterface<Company>> {
    try {
      const resp = await this.http.post<Company>(
        `${COMPANY_CMS_REGISTER}`,
        company,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async editCompany(
    company: FormData,
    id: number,
  ): Promise<HttpResponseInterface<Company>> {
    try {
      const resp = await this.http.put<Company>(
        `${COMPANY_BASE}/${id}`,
        company,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
