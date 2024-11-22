export interface SocialMedia {
  id: number;
  main: boolean;
  name: string;
  url: string;
  account_name: string;
  followers: number;
  video: string | null;
  cities: CitySocialRequest[] | CityRequest[];
  countries: CountrySocialRequest[] | CountryRequest[];
  ageRanges: SocialMediaStatistic[] | AgeRangeSocialRequest[];
  genders: SocialMediaStatistic[] | GenderSocialRequest[];
}

export interface SocialMediaStatistic {
  id: number;
  name: string;
  followers_percentage: number;
}

export enum SocialMediaTypes {
  instagram = "Instagram",
  tiktok = "TikTok",
  twitch = "Twitch",
  youtube = "Youtube",
}

export interface SocialMediaDataRequest {
  socialMedia: SocialMediaData[];
}

export interface SocialMediaData {
  social_media_id: number;
  cities: CitySocialRequest[];
  countries: CountrySocialRequest[];
  age_ranges: AgeRangeSocialRequest[];
  genders: GenderSocialRequest[];
}

export interface CitySocialRequest extends SocialMediaStatistic {
  city_id: number;
  followers_percentage: number;
  country_id: number;
}

export interface CityRequest {
  city_id: number;
  followers_percentage: number;
}

export interface CountrySocialRequest extends SocialMediaStatistic {
  country_id: number; // ID del país
  followers_percentage: number; // Porcentaje de seguidores en este país
}

export interface CountryRequest {
  country_id: number; // ID del país
  followers_percentage: number; // Porcentaje de seguidores en este país
}

export interface AgeRangeSocialRequest {
  age_range_id: number;
  followers_percentage: number;
}

export interface GenderSocialRequest {
  gender_id: number;
  followers_percentage: number;
}

export interface FullSocialMediaCityData extends CitySocialRequest {
  id: number;
  name: string;
  percentage: number;
}
