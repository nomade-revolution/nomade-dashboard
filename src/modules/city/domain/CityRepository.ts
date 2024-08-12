import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export interface CityRepository<I> {
  getCities(filterParams: FilterParams): Promise<HttpResponseInterface<I>>;
}
