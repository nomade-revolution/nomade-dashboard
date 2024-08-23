import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export interface LeadsRepository<I> {
  getLeads(
    page: number,
    per_page: number,
    params: FilterParams,
  ): Promise<HttpResponseInterface<I>>;
  sendLeadLink(lead_id: number): Promise<HttpResponseInterface<I>>;
  getLeadsForm(hash: string): Promise<HttpResponseInterface<I>>;
}
