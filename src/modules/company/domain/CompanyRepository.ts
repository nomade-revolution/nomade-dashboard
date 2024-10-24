import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export interface CompanyRepository<I> {
  deleteCompany(company_id: number): Promise<HttpResponseInterface<I>>;
  getCompanyById(influencer_id: number): Promise<HttpResponseInterface<I>>;
  registerCompany(company: FormData): Promise<HttpResponseInterface<I>>;
  getCompaniesBadge(): Promise<HttpResponseInterface<I>>;
  getAllCompanies(params: FilterParams): Promise<HttpResponseInterface<I>>;
}
