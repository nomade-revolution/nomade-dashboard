import React, { createContext, useState } from "react";
import { UserLogin } from "../../../modules/user/domain/User";
import { AuthRepository } from "@auth/domain/AuthRepository";
import {
  AuthLoginInterface,
  AuthRegisterInterface,
  SessionInterface,
} from "@auth";
import { authLogin } from "@auth/application/auth";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";

export interface ContextState {
  token: string;
  loginUser: (user: UserLogin) => void;
  logoutUser: () => void;
}

export const UserContext = createContext({} as ContextState);

export const UserContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: AuthRepository<
    AuthLoginInterface | AuthRegisterInterface,
    SessionInterface
  >;
}>) => {
  const [token, setToken] = useState<string>("");

  const login = async (user: AuthLoginInterface) => {
    const response = await authLogin(user, repository);
    if (isHttpSuccessResponse(response)) {
      setToken(response.data.access_token);
    }
  };

  function logout() {
    setToken("");
  }

  return (
    <UserContext.Provider
      value={{
        token,
        loginUser: login,
        logoutUser: logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
