import { HttpResponseInterface } from "@core";

export interface LeadsRepository<I> {
  getLeads(page: number, per_page: number): Promise<HttpResponseInterface<I>>;
}
