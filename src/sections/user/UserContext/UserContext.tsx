import React, { createContext, useState } from "react";

import { User } from "../../../modules/user/domain/User";
import {
  getUser,
  loginUser,
  logoutUser,
} from "../../../modules/user/application/userLocalStorage";
import { UserLocalStorageRepository } from "../../../modules/user/domain/UserLocalStorageRepository";

export interface ContextState {
  user: User;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  getUserLogged: () => User;
}

export const UserContext = createContext({} as ContextState);

export const UserContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: UserLocalStorageRepository }>) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  function login(user: { email: string; password: string }) {
    loginUser(user, repository);

    setUser({ email: user.email, password: user.password });
  }

  function logout() {
    logoutUser(repository);
    setUser({ email: "", password: "" });
  }

  function getUserLogged() {
    const user: User = getUser(repository);

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
