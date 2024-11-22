import environments from "@environments";

export const INFLUENCER_BASE = `${environments.API_PUBLIC_URL}/influencers`;
export const INFLUENCER_STATS = (influencer_id: number) =>
  `${INFLUENCER_BASE}/${influencer_id}`;
