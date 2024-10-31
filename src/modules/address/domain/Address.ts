export interface Address {
  address_id: number;
  address: string;
  min_guests: number;
  max_guests: number;
}

export interface FullAddress {
  name: string;
  address: string;
  address_2: string;
  city?: string;
  city_id: string;
  province: string;
  country?: string;
  country_id: number;
  zip_code: string;
  contact_name: string;
  contact_phone: string;
  id: number;
}
