import { HttpResponseInterface } from "@core/domain";
import { Lead, LeadsApiResponse } from "../domain/Leads";
import { LeadsRepository } from "../domain/LeadsRepository";

export const getLeads = (
  leadsRepo: LeadsRepository<LeadsApiResponse>,
  page: number,
  per_page: number,
): Promise<HttpResponseInterface<LeadsApiResponse>> => {
  return leadsRepo.getLeads(page, per_page);
};

export const sendLeadLink = (
  leadsRepo: LeadsRepository<LeadsApiResponse>,
  lead_id: number,
): Promise<HttpResponseInterface<{ data: Lead; success: boolean }>> => {
  return leadsRepo.sendLeadLink(lead_id);
};
