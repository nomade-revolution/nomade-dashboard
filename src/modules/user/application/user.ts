import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";

import { FilterParams } from "sections/shared/interfaces/interfaces";
import { UserRepository } from "../domain/UserRepository";
import { UserApiResponse } from "../domain/User";

export const getUsersFiltered = (
  usersRepo: UserRepository<UserApiResponse>,
  page: number,
  per_page: number,
  filterParams: FilterParams,
): Promise<HttpResponseInterface<UserApiResponse>> => {
  return usersRepo.getUsers(page, per_page, filterParams);
};

export const deleteUser = (
  usersRepo: UserRepository<{ succes: boolean }>,
  user_id: number,
): Promise<HttpResponseInterface<{ success: boolean }>> => {
  return usersRepo.deleteUser(user_id);
};
