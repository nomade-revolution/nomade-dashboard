export interface AuthLoginInterface {
  email: string;
  password: string;
}

export interface AuthRecoverPasswordInterface {
  email: string;
}
export interface AuthRegisterNomadeInterface {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  roles: number[];
}

export interface RegisterInfluencerInterface {
  name: string;
  surnames: string;
  prefix: string;
  phone: string;
  from_country_id: number;
  from_city_id: number;
  living_city_id: number;
  LGPD: boolean;
  categories: number[];
  avatar: File | null;
  living_country_id: number;
  email: string;

  password: string;
  repeatPassword: string;
  socialMedia: [
    {
      social_media_id: number;
      cities: { city_id: number; followers_percentage: number }[];
      countries: { country_id: number; followers_percentage: number }[];
      age_ranges: { id: number; followers_percentage: number }[];
      genders: { id: number; followers_percentage: number }[];
      followers: number;
      main: true;
      video: string;
      account_name: string;
    },
  ];
}
