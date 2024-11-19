export interface SocialMedia {
  id: number;
  main: boolean;
  name: string;
  url: string;
  account_name: string;
  followers: number;
  video: string | null;
  cities: SocialMediaStatistic[];
  countries: SocialMediaStatistic[];
  ageRanges: SocialMediaStatistic[];
  genders: SocialMediaStatistic[];
}

export interface SocialMediaStatistic {
  id: number;
  name: string;
  percentage: number;
}

export enum SocialMediaTypes {
  instagram = "Instagram",
  tiktok = "TikTok",
  twitch = "Twitch",
  youtube = "Youtube",
}
