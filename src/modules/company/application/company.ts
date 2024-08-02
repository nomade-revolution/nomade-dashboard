import { CompanyRepository } from "@company/domain/CompanyRepository";
import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";

export const deleteCompany = (
  companyRepo: CompanyRepository<{ succes: boolean }>,
  company_id: number,
): Promise<HttpResponseInterface<{ success: boolean }>> => {
  return companyRepo.deleteCompany(company_id);
};
