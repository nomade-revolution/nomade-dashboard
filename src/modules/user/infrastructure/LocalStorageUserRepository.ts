import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export const loginUserLocalStorageUserRepository = (): UserRepository => {
  return {
    login,
  };
};

export const login = (user: User) => {
  getFromLocalStorage();
  localStorage.setItem("user", JSON.stringify(user));
};

export const getFromLocalStorage = () => {
  const user = localStorage.getItem("user");

  return user;
};
