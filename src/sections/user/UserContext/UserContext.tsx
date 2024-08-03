import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { UserRepository } from "modules/user/domain/UserRepository";
import {
  Company,
  Influencer,
  User,
  UserApiResponse,
  UserTypes,
} from "modules/user/domain/User";
import {
  FilterParams,
  PaginationStucture,
} from "sections/shared/interfaces/interfaces";
import { deleteUser, getUsersFiltered } from "modules/user/application/user";

interface ContextState {
  users_nomade: User[];
  users_influencer: Influencer[];
  users_company: Company[];
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  pagination: PaginationStucture;
  getUsers: (
    page: number,
    per_page: number,
    filterParams: FilterParams,
    type: string,
  ) => void;
  deleteUserById: (user_id: number) => void;
}

export const UserContext = createContext<ContextState>({} as ContextState);

export const UserContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: UserRepository<UserApiResponse>;
}>) => {
  const [users_nomade, setUsersNomade] = useState<User[]>([]);
  const [users_influencer, setUsersInfluencer] = useState<Influencer[]>([]);
  const [users_company, setUsersCompany] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );

  const getUsers = useCallback(
    async (
      page: number,
      per_page: number,
      filterParams: FilterParams,
      type: string,
    ) => {
      setLoading(true);
      setError(null);

      const response = await getUsersFiltered(
        repository,
        page,
        per_page,
        filterParams,
      );
      if (isHttpSuccessResponse(response)) {
        setPagination(response.data.pagination);
        setLoading(false);
        switch (type) {
          case UserTypes.nomade:
            setUsersNomade(response.data.users);

            break;
          case UserTypes.influencer:
            setUsersInfluencer(response.data.users as Influencer[]);
            break;
          case UserTypes.company:
            setUsersCompany(response.data.users as Company[]);
            break;
        }
      }
    },
    [repository],
  );

  const deleteUserById = async (user_id: number) => {
    const response = await deleteUser(repository, user_id);

    setIsSuccess(response.success);

    return response;
  };

  return (
    <UserContext.Provider
      value={{
        users_nomade,
        users_company,
        users_influencer,
        loading,
        error,
        pagination,
        isSuccess,
        getUsers,
        deleteUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
