import { UserCredentials } from "../domain/User";

export const loginUserLocalStorageUserRepository = () => {
  return {
    login,
    getFromLocalStorage,
    logout,
  };
};

export const login = (user: UserCredentials) => {
  getFromLocalStorage();
  localStorage.setItem("user", JSON.stringify(user));
};

export const getFromLocalStorage = () => {
  const user = localStorage.getItem("user" || "");

  return user as unknown as UserCredentials;
};

export const logout = () => {
  localStorage.clear();
};
