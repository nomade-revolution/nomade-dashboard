export interface SocialMedia {
  id: number;
  name: string;
  url: string;
  account_name: string;
  followers: number;
}

export enum SocialMediaTypes {
  instagram = "Instagram",
  tiktok = "TikTok",
  twitch = "Twitch",
  youtube = "Youtube",
}
