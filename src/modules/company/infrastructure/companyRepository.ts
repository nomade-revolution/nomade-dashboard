import {
  COMPANY_BASE,
  COMPANY_CMS_REGISTER,
} from "@company/application/routes";
import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { CompaniesApiResponse, Company } from "modules/user/domain/User";
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
      const resp = await this.http.get<Company[]>(COMPANY_BASE, { ...params });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public exportCompanies = async (token: string): Promise<Blob> => {
    try {
      const response = await fetch(`${COMPANY_BASE}/export`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.blob();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  public exportCompanyBilling = async (token: string): Promise<Blob> => {
    try {
      const date = new Date().toISOString().split("T")[0];

      const response = await fetch(
        `${COMPANY_BASE}/billing?filters%5Bdate%5D=${date}`,
        {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.blob();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  public async getCompaniesWithPagination(
    page: number,
    per_page: number,
    filters: FilterParams,
  ): Promise<HttpResponseInterface<CompaniesApiResponse>> {
    try {
      const resp = await this.http.get<CompaniesApiResponse>(COMPANY_BASE, {
        page,
        per_page,
        ...filters,
      });
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
