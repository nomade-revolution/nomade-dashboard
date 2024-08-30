import { HttpResponseInterface } from "@core";

export interface CountryRepository<I> {
  getCountries(): Promise<HttpResponseInterface<I>>;
}
