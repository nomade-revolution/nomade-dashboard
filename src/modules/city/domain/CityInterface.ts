import { CountryInterface } from "@country/domain";

export interface CityInterface {
  id: number;
  name: string;
  country?: CountryInterface;
}
