import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { CountryInterface } from "@country/domain";
import { CountryRepository } from "@country/domain/CountryRepository";

export const getCountries = (
  countryRepo: CountryRepository<CountryInterface[]>,
): Promise<HttpResponseInterface<CountryInterface[]>> => {
  return countryRepo.getCountries();
};
