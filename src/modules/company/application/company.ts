import { CompanyRepository } from "@company/domain/CompanyRepository";
import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { CompaniesApiResponse, Company } from "modules/user/domain/User";
import { FilterParams } from "sections/shared/interfaces/interfaces";

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

export const getCompanies = (
  companyRepo: CompanyRepository<Company[]>,
  params: FilterParams,
) => {
  return companyRepo.getCompanies(params);
};

export const getCompaniesWithPagination = (
  companyRepo: CompanyRepository<CompaniesApiResponse>,
  page: number,
  per_page: number,
  filters: FilterParams,
) => {
  return companyRepo.getCompaniesWithPagination(page, per_page, filters);
};

export const postNewCompany = (
  companyRepo: CompanyRepository<Company>,
  company: FormData,
) => {
  return companyRepo.postNewCompany(company);
};

export const editCompany = (
  companyRepo: CompanyRepository<Company>,
  company: FormData,
  id: number,
) => {
  return companyRepo.editCompany(company, id);
};
