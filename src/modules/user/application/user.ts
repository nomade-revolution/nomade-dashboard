import { UserLogin, UserLoginApiResponse } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export const loginUser = (
  user: UserLogin,
  userRepository: UserRepository,
): Promise<{
  data?: UserLoginApiResponse;
  success?: boolean;
  error?: string;
}> => {
  return userRepository.login(user);
};
