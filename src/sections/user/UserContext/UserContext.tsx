import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { UserRepository } from "modules/user/domain/UserRepository";
import {
  Company,
  User,
  UserApiResponse,
  UserTypes,
} from "modules/user/domain/User";
import {
  FilterParams,
  PaginationStucture,
} from "sections/shared/interfaces/interfaces";
import {
  deleteUser,
  getUsersBadge,
  getUsersFiltered,
} from "modules/user/application/user";
import { Influencer } from "@influencer";
import { AuthRegisterNomadeInterface } from "@auth";
import { HttpResponseInterface } from "../../../modules/core/domain/HttpResponseInterface";

export interface OrderItem {
  sortTag: string;
  direction: "ASC" | "DESC" | null;
}
interface ContextState {
  users_nomade: User[];
  users_influencer: Influencer[];
  users_company: Company[];
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  pagination: PaginationStucture;
  order: OrderItem;
  badgeCount: number;
  getUsers: (
    page: number,
    per_page: number,
    filterParams: FilterParams,
    type: string,
  ) => void;
  deleteUserById: (user_id: number) => void;
  setOrder: (order: OrderItem) => void;
  getUsersStatusBadge: () => void;
  registerUser: (
    data: AuthRegisterNomadeInterface,
  ) => Promise<HttpResponseInterface<User>>;
  users_infleuncerCompany: User[];
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
  const [users_infleuncerCompany, setUsersInfleuncerCompany] = useState<User[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );
  const [order, setOrder] = useState<OrderItem>({} as OrderItem);
  const [badgeCount, setBadgeCount] = useState<number>(0);

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
            setUsersNomade(response.data.users as User[]);

            break;
          case UserTypes.influencer:
            setUsersInfluencer(response.data.users as Influencer[]);
            break;
          case UserTypes.company:
            setUsersCompany(response.data.users as Company[]);
            break;
          case UserTypes.infleuncerCompany:
            setUsersInfleuncerCompany(response.data.users as User[]);
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

  const getUsersStatusBadge = useCallback(async () => {
    const response = await getUsersBadge(repository);

    if (isHttpSuccessResponse(response)) {
      setBadgeCount(response.data);
    }

    return response;
  }, [repository]);

  const registerUser = async (data: AuthRegisterNomadeInterface) => {
    setLoading(true);
    const response = await repository.registerUser(data);

    setLoading(false);
    return response;
  };
  return (
    <UserContext.Provider
      value={{
        registerUser,
        users_nomade,
        users_company,
        users_influencer,
        loading,
        error,
        pagination,
        order,
        isSuccess,
        badgeCount,
        getUsers,
        deleteUserById,
        setOrder,
        getUsersStatusBadge,
        users_infleuncerCompany,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
