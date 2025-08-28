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
   * Mark a lead as read/unread with dual strategy fallback
   * @param id - Lead ID
   * @param read - Whether to mark as read
   * @returns Updated lead or success response
   */
  public async markLeadRead(
    id: number | string,
    read: boolean,
  ): Promise<HttpResponseInterface<Lead | { success: boolean }>> {
    try {
      // Strategy 1: Try the dedicated mark-as-read endpoint
      try {
        const resp = await this.http.post<Lead | { success: boolean }>(
          endpoints.markLeadRead(id),
          { is_read: read },
        );
        return resp;
      } catch (error: unknown) {
        // If 404/405, fallback to PATCH on the lead endpoint
        if (
          error &&
          typeof error === "object" &&
          "response" in error &&
          error.response &&
          typeof error.response === "object" &&
          "status" in error.response &&
          (error.response.status === 404 || error.response.status === 405)
        ) {
          const payload = this.buildReadPayload(read);
          const resp = await this.http.patch<Lead | { success: boolean }>(
            endpoints.lead(id),
            payload,
          );
          return resp;
        }
        throw error;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Build the payload for marking lead as read/unread
   * @param read - Whether to mark as read
   * @returns Payload object
   */
  private buildReadPayload(read: boolean): {
    is_read?: boolean;
    read_at?: string | null;
  } {
    // Try is_read first, fallback to read_at if needed
    return read
      ? { is_read: true, read_at: new Date().toISOString() }
      : { is_read: false, read_at: null };
  }
}
