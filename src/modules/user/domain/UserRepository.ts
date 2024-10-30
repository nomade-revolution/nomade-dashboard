import { AuthRegisterInterface } from "@auth";
import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export interface UserRepository<I> {
  getUsers(
    page: number,
    per_page: number,
    filterParams: FilterParams,
  ): Promise<HttpResponseInterface<I>>;
  deleteUser(user_id: number): Promise<HttpResponseInterface<I>>;
  getUsersBadge(): Promise<HttpResponseInterface<I>>;
  registerUser: (
    data: AuthRegisterInterface,
  ) => Promise<HttpResponseInterface<I>>;
}
