import environments from "@environments";

export const COLLABS_BASE = `${environments.API_PUBLIC_URL}/colabs`;
export const COLLABS_REJECTED_REASONS = `${environments.API_PUBLIC_URL}/rejected-colab-reasons`;

export const endpoints = {
  colab: (id: string | number) => `${COLLABS_BASE}/${id}`,
  pushHistory: (id: string | number, state: number | string) =>
    `${COLLABS_BASE}/${id}/push-history/${state}`,
};
