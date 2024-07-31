import React, { createContext, useCallback, useState } from "react";
import { AuthRepository } from "@auth/domain/AuthRepository";
import {
  AuthLoginInterface,
  AuthRegisterInterface,
  SessionInterface,
} from "@auth";
import { authLogin } from "@auth/application/auth";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { AsyncCookiesImplementation } from "@core";
import environments from "@environments";
import Cookies from "js-cookie";

export interface ContextState {
  token: string;
  isSuccess: boolean;
  loginUser: (user: AuthLoginInterface) => void;
  logoutUser: () => void;
  getSessionToken: () => string;
}

export const AuthContext = createContext({} as ContextState);

export const AuthContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: AuthRepository<
    AuthLoginInterface | AuthRegisterInterface,
    SessionInterface
  >;
}>) => {
  const cookies = new AsyncCookiesImplementation();
  const [token, setToken] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const login = async (user: AuthLoginInterface) => {
    const response = await authLogin(user, repository);

    if (isHttpSuccessResponse(response)) {
      setToken(response.data.access_token);
      cookies.set(environments.cookies!, response.data.access_token);
    }

    setIsSuccess(response.success);
  };

  function logout() {
    setToken("");
    cookies.remove(environments.cookies!);
  }

  const getSessionToken = useCallback(() => {
    return Cookies?.get(environments.cookies!) || "";
  }, []);

  setTimeout(() => setIsSuccess(false), 2000);

  return (
    <AuthContext.Provider
      value={{
        token,
        isSuccess,
        loginUser: login,
        logoutUser: logout,
        getSessionToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
