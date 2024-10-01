import { CompanyRepository } from "@company/domain/CompanyRepository";
import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { Company } from "modules/user/domain/User";

export const deleteCompany = (
  companyRepo: CompanyRepository<{ succes: boolean }>,
  company_id: number,
): Promise<HttpResponseInterface<{ success: boolean }>> => {
  return companyRepo.deleteCompany(company_id);
};

export const getCompanyById = (
  companyRepo: CompanyRepository<Company>,
  company_id: number,
): Promise<HttpResponseInterface<Company>> => {
  return companyRepo.getCompanyById(company_id);
};

export const registerCompany = (
  companyRepo: CompanyRepository<Company>,
  company: FormData,
): Promise<HttpResponseInterface<Company>> => {
  return companyRepo.registerCompany(company);
};

export const getCompaniesBadge = (companyRepo: CompanyRepository<number>) => {
  return companyRepo.getCompaniesBadge();
};
