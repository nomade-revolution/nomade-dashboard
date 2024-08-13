import { HttpResponseInterface } from "@core";

export interface LeadsRepository<I> {
  getLeads(page: number, per_page: number): Promise<HttpResponseInterface<I>>;
  sendLeadLink(lead_id: number): Promise<HttpResponseInterface<I>>;
  getLeadsForm(hash: string): Promise<HttpResponseInterface<I>>;
}
