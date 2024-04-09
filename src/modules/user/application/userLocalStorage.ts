import { UserLogin } from "../domain/User";
import { UserLocalStorageRepository } from "../domain/UserLocalStorageRepository";

export const loginUser = (
  user: UserLogin,
  userRepository: UserLocalStorageRepository,
): void => {
  userRepository.login(user);
};

export const logoutUser = (
  userRepository: UserLocalStorageRepository,
): void => {
  userRepository.logout();
};

export const getUser = (
  userRepository: UserLocalStorageRepository,
): UserLogin => {
  return userRepository.getFromLocalStorage();
};
