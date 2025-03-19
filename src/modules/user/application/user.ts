import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import { UserRepository } from "../domain/UserRepository";
import { User, UserApiResponse, UserRol } from "../domain/User";

export const getUsersFiltered = (
  usersRepo: UserRepository<UserApiResponse>,
  page: number,
  per_page: number,
  filterParams: FilterParams,
): Promise<HttpResponseInterface<UserApiResponse>> => {
  return usersRepo.getUsers(page, per_page, filterParams);
};

export const getUserData = (
  usersRepo: UserRepository<UserApiResponse>,
  user_id: number,
): Promise<HttpResponseInterface<User>> => {
  return usersRepo.getUserData(user_id);
};

export const deleteUser = (
  usersRepo: UserRepository<{ succes: boolean }>,
  user_id: number,
): Promise<HttpResponseInterface<{ success: boolean }>> => {
  return usersRepo.deleteUser(user_id);
};

export const modifyUser = (
  usersRepo: UserRepository<{ succes: boolean }>,
  user_id: number,
  data: FormData,
): Promise<HttpResponseInterface<{ success: boolean }>> => {
  return usersRepo.modifyUser(user_id, data);
};

export const getUsersBadge = (usersRepo: UserRepository<number>) => {
  return usersRepo.getUsersBadge();
};
export const exportInfluencersData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  usersRepo: UserRepository<any>,
  token: string,
) => {
  return usersRepo.exportInfluencersData(token);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getConditions = (usersRepo: any) => {
  return usersRepo.getConditions();
};

export const getRolesListData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  usersRepo: UserRepository<any>,
): Promise<HttpResponseInterface<UserRol[]>> => {
  return usersRepo.getRolesList();
};
