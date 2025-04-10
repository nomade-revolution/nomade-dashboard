import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { UserRepository } from "modules/user/domain/UserRepository";
import {
  Company,
  User,
  UserApiResponse,
  UserRol,
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
  exportInfluencersData,
  getConditions as getConditionsData,
  getRolesListData,
  getUserData,
  modifyUser,
} from "modules/user/application/user";
import { Influencer } from "@influencer";
import { AuthRegisterNomadeInterface } from "@auth";
import { HttpResponseInterface } from "../../../modules/core/domain/HttpResponseInterface";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";

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
  users_influencerCompany: User[];
  exportInfluencers: () => void;
  conditions: string;
  getConditions: (companyId: number) => void;
  getRolesList: () => void;
  rolesList: UserRol[];
  getUser: (user_id: number) => void;
  userData: User | null;
  modifyUserById: (user_id: number, data: FormData) => void;
  setBadgeCount: (count: number) => void;
}

export const UserContext = createContext<ContextState>({} as ContextState);

export const UserContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: UserRepository<UserApiResponse>;
}>) => {
  const { token } = useAuthContext();
  const [userData, setUserData] = useState<User | null>(null);
  const [users_nomade, setUsersNomade] = useState<User[]>([]);
  const [users_influencer, setUsersInfluencer] = useState<Influencer[]>([]);
  const [users_company, setUsersCompany] = useState<Company[]>([]);
  const [users_influencerCompany, setUsersInfleuncerCompany] = useState<User[]>(
    [],
  );
  const [conditions, setConditions] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );
  const [order, setOrder] = useState<OrderItem>({} as OrderItem);
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [rolesList, setRolesList] = useState<UserRol[]>([]);

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

  const getUser = useCallback(
    async (user_id: number) => {
      setLoading(true);
      const response = await getUserData(repository, user_id);
      // @ts-expect-error fix this
      setUserData(response.data);
      setLoading(false);
      return response;
    },
    [repository],
  );

  const deleteUserById = async (user_id: number) => {
    const response = await deleteUser(repository, user_id);

    setIsSuccess(response.success);

    return response;
  };

  const modifyUserById = async (user_id: number, data: FormData) => {
    const response = await modifyUser(repository, user_id, data);

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

  const exportInfluencers = useCallback(async () => {
    const response = await exportInfluencersData(repository, token);

    if (response && response instanceof Blob) {
      const href = await URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = href;
      link.download = `influencers`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(href);
    }
    return response;
  }, [repository, token]);

  const getConditions = useCallback(
    async (companyId: number) => {
      setLoading(true);
      const response = await getConditionsData(repository, companyId);

      if (isHttpSuccessResponse(response)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setConditions(((response as any)?.data[0]?.contents as string) ?? "");
      }

      setLoading(false);
      return response;
    },
    [repository],
  );

  const getRolesList = useCallback(async () => {
    setLoading(true);
    const response = await getRolesListData(repository);

    if (isHttpSuccessResponse(response)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setRolesList((response as any)?.data);
    }

    setLoading(false);
    return response;
  }, [repository]);

  return (
    <UserContext.Provider
      value={{
        exportInfluencers,
        registerUser,
        users_nomade,
        users_company,
        users_influencer,
        loading,
        getConditions,
        error,
        pagination,
        order,
        isSuccess,
        badgeCount,
        getUsers,
        deleteUserById,
        setOrder,
        getUsersStatusBadge,
        users_influencerCompany,
        conditions,
        getRolesList,
        rolesList,
        getUser,
        userData,
        modifyUserById,
        setBadgeCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
