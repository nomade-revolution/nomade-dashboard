import React, { createContext, useCallback, useState } from "react";
import { AuthRepository } from "@auth/domain/AuthRepository";
import {
  AuthLoginInterface,
  AuthRegisterInterface,
  SessionInterface,
} from "@auth";
import { authGetLoggedUser, authLogin } from "@auth/application/auth";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { AsyncCookiesImplementation } from "@core";
import environments from "@environments";
import Cookies from "js-cookie";
import { User } from "modules/user/domain/User";

export interface ContextState {
  token: string;
  isSuccess: boolean;
  loginUser: (user: AuthLoginInterface) => void;
  logoutUser: () => void;
  getSessionToken: () => string;
  setSessionToken: () => void;
  getLoggedUser: (token: string) => Promise<User>;
  user: User;
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
  const [user, setUser] = useState<User>({} as User);
  const cookies = new AsyncCookiesImplementation();
  const [token, setToken] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const login = async (user: AuthLoginInterface) => {
    const response = await authLogin(user, repository);

    if (isHttpSuccessResponse(response)) {
      setToken(response.data.access_token);
      cookies.set(environments.cookies!, response.data.access_token);
      const userLogged = await getLoggedUser(response.data.access_token);
      setUser(userLogged);
    }
    setIsSuccess(response.success);
  };

  function logout() {
    setToken("");
    setUser({} as User);
    cookies.remove(environments.cookies!);
  }

  const getSessionToken = useCallback(() => {
    return Cookies?.get(environments.cookies!) || "";
  }, []);

  const getLoggedUser = useCallback(
    async (token: string) => {
      const response = await authGetLoggedUser(token, repository);
      if (isHttpSuccessResponse(response)) {
        return response.data;
      }
      return {} as User;
    },
    [repository],
  );

  const setSessionToken = useCallback(async () => {
    const token = getSessionToken();
    setToken(token);
    const user = await getLoggedUser(token);
    setUser(user);
  }, [getSessionToken, getLoggedUser]);

  setTimeout(() => setIsSuccess(false), 2000);

  return (
    <AuthContext.Provider
      value={{
        token,
        isSuccess,
        loginUser: login,
        logoutUser: logout,
        getSessionToken,
        getLoggedUser,
        setSessionToken,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
