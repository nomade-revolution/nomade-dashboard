import environments from "@environments";

export const LEADS_BASE = `${environments.API_PUBLIC_URL}/leads`;

export const endpoints = {
  lead: (id: string | number) => `${LEADS_BASE}/${id}`,
  markLeadRead: (id: string | number) => `${LEADS_BASE}/${id}/mark-as-read`,
};
