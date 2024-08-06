import { HttpResponseInterface } from "@core";

export interface CompanyRepository<I> {
  deleteCompany(company_id: number): Promise<HttpResponseInterface<I>>;
  getCompanyById(influencer_id: number): Promise<HttpResponseInterface<I>>;
}
