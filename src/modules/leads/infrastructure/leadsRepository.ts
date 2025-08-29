import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { Lead, LeadsApiResponse } from "../domain/Leads";
import { LeadsRepository as ILeadsRepository } from "../domain/LeadsRepository";
import { LEADS_BASE, endpoints } from "../application/routes";
import { CompanyRegisterStructure } from "modules/user/domain/User";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export class LeadsRepository implements ILeadsRepository<LeadsApiResponse> {
  private readonly http: Http = Http.getInstance();

  public async getLeads(
    page: number,
    per_page: number,
    params: FilterParams,
  ): Promise<HttpResponseInterface<LeadsApiResponse>> {
    try {
      const resp = await this.http.get<LeadsApiResponse>(LEADS_BASE, {
        page,
        per_page,
        ...params,
      });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async sendLeadLink(
    lead_id: number,
  ): Promise<HttpResponseInterface<Lead>> {
    try {
      const resp = await this.http.post<Lead>(
        `${LEADS_BASE}/${lead_id}/send-link`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getLeadsForm(
    hash: string,
  ): Promise<HttpResponseInterface<CompanyRegisterStructure>> {
    try {
      const resp = await this.http.get<Lead>(`${LEADS_BASE}/form/${hash}`);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getLeadsBadge(): Promise<HttpResponseInterface<number>> {
    try {
      const resp = await this.http.get<number>(`${LEADS_BASE}/status/badge`);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Mark a lead as read/unread using the dedicated endpoint
   * @param id - Lead ID
   * @returns Updated lead or success response
   */
  public async markLeadRead(
    id: number | string,
  ): Promise<HttpResponseInterface<Lead | { success: boolean }>> {
    try {
      const resp = await this.http.post<Lead | { success: boolean }>(
        endpoints.markLeadRead(id),
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
