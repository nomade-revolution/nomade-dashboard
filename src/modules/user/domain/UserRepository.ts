import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export interface UserRepository<I> {
  getUsers(
    page: number,
    per_page: number,
    filterParams: FilterParams,
  ): Promise<HttpResponseInterface<I>>;
}
