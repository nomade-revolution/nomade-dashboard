/* eslint-disable @typescript-eslint/no-explicit-any */
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
  is_nomade_staff?: boolean;
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
  password_confirmation: string;
  socialMedia: any[];
}
