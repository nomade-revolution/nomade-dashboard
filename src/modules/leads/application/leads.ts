import { HttpResponseInterface } from "@core/domain";
import { LeadsApiResponse } from "../domain/Leads";
import { LeadsRepository } from "../domain/LeadsRepository";

export const getLeads = (
  leadsRepo: LeadsRepository<LeadsApiResponse>,
  page: number,
  per_page: number,
): Promise<HttpResponseInterface<LeadsApiResponse>> => {
  return leadsRepo.getLeads(page, per_page);
};
