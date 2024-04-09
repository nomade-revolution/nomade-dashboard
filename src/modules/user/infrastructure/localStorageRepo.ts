import { UserLogin } from "../domain/User";

export const loginUserLocalStorageUserRepository = () => {
  return {
    login,
    getFromLocalStorage,
    logout,
  };
};

export const login = (user: UserLogin) => {
  getFromLocalStorage();
  localStorage.setItem("user", JSON.stringify(user));
};

export const getFromLocalStorage = () => {
  const user = localStorage.getItem("user" || "");

  return user as unknown as UserLogin;
};

export const logout = () => {
  localStorage.clear();
};
