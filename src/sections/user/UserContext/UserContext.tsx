import React, { createContext, useEffect, useState } from "react";

import { UserRepository } from "../../../modules/user/domain/UserRepository";
import { User } from "../../../modules/user/domain/User";
import { loginUser } from "../../../modules/user/application/user";

export interface ContextState {
  user: User;
  loginUser: (user: { email: string; password: string }) => void;
}

export const UserContext = createContext({} as ContextState);

export const UserContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: UserRepository }>) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  function login(user: { email: string; password: string }) {
    loginUser(user, repository);
  }

  function getUser() {
    setUser({ email: "", password: "" });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginUser: login }}>
      {children}
    </UserContext.Provider>
  );
};
