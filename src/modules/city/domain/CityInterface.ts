import { CountryInterface } from "@country/domain";

export interface CityInterface {
  id: number;
  name: string;
  country_id?: number;
  country?: CountryInterface;
}
