import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export const loginUser = (user: User, userRepository: UserRepository): void => {
  userRepository.login(user);
};
