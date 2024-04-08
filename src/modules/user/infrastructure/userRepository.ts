import endpoints from "../../../sections/shared/utils/api/endpoints";
import customAxios from "../../../sections/shared/utils/customAxios/customAxios";

import { UserLogin, UserLoginApiResponse } from "../domain/User";

import { UserRepository } from "../domain/UserRepository";

export const userRepository = (): UserRepository => {
  return {
    login,
  };
};

export const login = async (
  user: UserLogin,
): Promise<{
  data?: UserLoginApiResponse;
  success?: boolean;
  error?: string;
}> => {
  const { data, success, error } = await customAxios("POST", endpoints.login, {
    data: user,
  });

  if (!success) {
    return { success, error };
  }

  return { data: data as UserLoginApiResponse };
};
