import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { UserRepository } from "modules/user/domain/UserRepository";
import { User, UserApiResponse } from "modules/user/domain/User";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import { getUsersFiltered } from "modules/user/application/user";

interface ContextState {
  users_nomade: User[];
  loading: boolean;
  error: string | null;
  getUsers: (
    page: number,
    per_page: number,
    filterParams: FilterParams,
  ) => void;
}

export const UserContext = createContext<ContextState>({} as ContextState);

export const UserContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: UserRepository<UserApiResponse>;
}>) => {
  const [users_nomade, setUsersNomade] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUsers = useCallback(
    async (page: number, per_page: number, filterParams: FilterParams) => {
      setLoading(true);
      setError(null);

      const response = await getUsersFiltered(
        repository,
        page,
        per_page,
        filterParams,
      );
      if (isHttpSuccessResponse(response)) {
        setUsersNomade(response.data.users);
      }
    },
    [repository],
  );

  return (
    <UserContext.Provider
      value={{
        users_nomade,
        loading,
        error,
        getUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
