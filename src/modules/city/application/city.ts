import { CityInterface } from "@city/domain";
import { CityRepository } from "@city/domain/CityRepository";
import { HttpResponseInterface } from "@core/domain";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export const getCities = (
  cityRepo: CityRepository<CityInterface[]>,
  filterParams: FilterParams,
): Promise<HttpResponseInterface<CityInterface[]>> => {
  return cityRepo.getCities(filterParams);
};
