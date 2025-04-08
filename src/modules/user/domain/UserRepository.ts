import { AuthRegisterNomadeInterface } from "@auth";
import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export interface UserRepository<I> {
  getUsers(
    page: number,
    per_page: number,
    filterParams: FilterParams,
  ): Promise<HttpResponseInterface<I>>;
  getUserData(user_id: number): Promise<HttpResponseInterface<I>>;
  deleteUser(user_id: number): Promise<HttpResponseInterface<I>>;
  modifyUser(
    user_id: number,
    data: FormData,
  ): Promise<HttpResponseInterface<I>>;
  getUsersBadge(): Promise<HttpResponseInterface<I>>;
  registerUser: (
    data: AuthRegisterNomadeInterface,
  ) => Promise<HttpResponseInterface<I>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exportInfluencersData: (token: string) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getConditions: (companyId: number) => Promise<any>;
  getRolesList: () => Promise<HttpResponseInterface<I>>;
}
