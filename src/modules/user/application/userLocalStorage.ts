import { UserCredentials } from "../domain/User";
import { UserLocalStorageRepository } from "../domain/UserLocalStorageRepository";

export const loginUser = (
  user: UserCredentials,
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
): UserCredentials => {
  return userRepository.getFromLocalStorage();
};
