import environments from "@environments";

export const COMPANIES_PLANS = `${environments.API_PUBLIC_URL}/companies/status/info`;
export const COMPANIES_PLAN_UPDATE = (company_id: number) =>
  `${environments.API_PUBLIC_URL}/companies/${company_id}/company-plan`;
