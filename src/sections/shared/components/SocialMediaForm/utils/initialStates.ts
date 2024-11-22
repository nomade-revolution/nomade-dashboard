import {
  CitySocialRequest,
  CountrySocialRequest,
  SocialMediaData,
} from "@influencer/domain/InfluencerSocialMedia";

export const initialData: SocialMediaData = {
  social_media_id: 0,
  cities: [],
  countries: [],
  age_ranges: [],
  genders: [],
};

export const initialStateCities: CitySocialRequest = {
  id: 0,
  name: "",
  city_id: 0,
  followers_percentage: 0,
  country_id: 0,
};

export const initialStateCountries: CountrySocialRequest = {
  id: 0,
  name: "",
  country_id: 0,
  followers_percentage: 0,
};
