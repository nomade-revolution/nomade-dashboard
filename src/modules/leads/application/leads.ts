import { HttpResponseInterface } from "@core/domain";
import { Lead, LeadsApiResponse } from "../domain/Leads";
import { LeadsRepository } from "../domain/LeadsRepository";
import { CompanyRegisterStructure } from "modules/user/domain/User";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export const getLeads = (
  leadsRepo: LeadsRepository<LeadsApiResponse>,
  page: number,
  per_page: number,
  params: FilterParams,
): Promise<HttpResponseInterface<LeadsApiResponse>> => {
  return leadsRepo.getLeads(page, per_page, params);
};

export const sendLeadLink = (
  leadsRepo: LeadsRepository<LeadsApiResponse>,
  lead_id: number,
): Promise<HttpResponseInterface<{ data: Lead; success: boolean }>> => {
  return leadsRepo.sendLeadLink(lead_id);
};

export const getLeadsForm = (
  leadsRepo: LeadsRepository<LeadsApiResponse>,
  hash: string,
): Promise<HttpResponseInterface<CompanyRegisterStructure>> => {
  return leadsRepo.getLeadsForm(hash);
};
