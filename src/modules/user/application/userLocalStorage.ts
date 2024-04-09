import { User } from "../domain/User";
import { UserLocalStorageRepository } from "../domain/UserLocalStorageRepository";

export const loginUser = (
  user: User,
  userRepository: UserLocalStorageRepository,
): void => {
  userRepository.login(user);
};

export const logoutUser = (
  userRepository: UserLocalStorageRepository,
): void => {
  userRepository.logout();
};

export const getUser = (userRepository: UserLocalStorageRepository): User => {
  return userRepository.getFromLocalStorage();
};
