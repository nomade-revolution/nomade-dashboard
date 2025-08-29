import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import { Lead } from "./Leads";

export interface LeadsRepository<I> {
  getLeads(
    page: number,
    per_page: number,
    params: FilterParams,
  ): Promise<HttpResponseInterface<I>>;
  sendLeadLink(lead_id: number): Promise<HttpResponseInterface<I>>;
  getLeadsForm(hash: string): Promise<HttpResponseInterface<I>>;
  getLeadsBadge(): Promise<HttpResponseInterface<I>>;
  markLeadRead(
    id: number | string,
  ): Promise<HttpResponseInterface<Lead | { success: boolean }>>;
}
