import React, { createContext, useState } from "react";

import {
  getUser,
  loginUser,
  logoutUser,
} from "../../../modules/user/application/userLocalStorage";
import { UserLocalStorageRepository } from "../../../modules/user/domain/UserLocalStorageRepository";
import { UserLogin } from "../../../modules/user/domain/User";

export interface ContextState {
  user: UserLogin;
  loginUser: (user: UserLogin) => void;
  logoutUser: () => void;
  getUserLogged: () => UserLogin;
}

export const UserContext = createContext({} as ContextState);

export const UserContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: UserLocalStorageRepository }>) => {
  const [user, setUser] = useState<UserLogin>({
    email: "",
    password: "",
  });

  function login(user: { email: string; password: string }) {
    loginUser(user, repository);

    setUser({ email: user.email, password: user.password });
  }

  function logout() {
    logoutUser(repository);
    setUser({ email: "", password: "" });
  }

  function getUserLogged() {
    const user: UserLogin = getUser(repository);

    return user;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser: login,
        logoutUser: logout,
        getUserLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
