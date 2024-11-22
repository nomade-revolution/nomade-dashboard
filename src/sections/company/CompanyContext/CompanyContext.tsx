import React, { createContext, useCallback, useState } from "react";
import { CompanyRepository } from "@company/domain/CompanyRepository";
import {
  deleteCompany,
  getCompaniesBadge,
  getCompanyById,
  registerCompany,
  getCompanies,
  postNewCompany,
  editCompany,
  getCompaniesWithPagination,
} from "@company/application/company";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { Company } from "modules/user/domain/User";
import {
  FilterParams,
  PaginationStucture,
} from "sections/shared/interfaces/interfaces";
import { OrderItem } from "sections/user/UserContext/UserContext";
import {
  exportCompanies,
  exportCompanyBilling,
} from "../../../modules/company/application/company";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";

interface ContextState {
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  company: Company;
  badgeCount: number;
  companies: Company[];
  pagination: PaginationStucture;
  orderCompanies: OrderItem;
  setOrderCompanies: (order: OrderItem) => void;
  getCompaniesWithParams: (params: FilterParams) => void;
  getCompaniesPaginated: (
    page: number,
    per_page: number,
    params?: FilterParams,
  ) => void;
  deleteCompanyById: (company_id: number) => void;
  getCompany: (company_id: number) => void;
  postCompany: (company: FormData) => void;
  getCompaniesStatusBadge: () => void;
  postCompanyCms: (company: FormData) => void;
  editCompanyCms: (company: FormData, id?: number) => void;
  exportCompaniesExcel: () => void;
  exportCompanyBillingExcel: () => void;
}

export const CompanyContext = createContext<ContextState>({} as ContextState);

export const CompanyContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: CompanyRepository<{ success: boolean; company: Company }>;
}>) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [company, setCompany] = useState<Company>({} as Company);
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );
  const [orderCompanies, setOrderCompanies] = useState<OrderItem>(
    {} as OrderItem,
  );

  const deleteCompanyById = async (company_id: number) => {
    const response = await deleteCompany(repository, company_id);

    setIsSuccess(response.success);

    return response;
  };

  const getCompany = useCallback(
    async (company_id: number) => {
      setLoading(true);
      const response = await getCompanyById(repository, company_id);

      if (isHttpSuccessResponse(response)) {
        setCompany(response.data);
        setLoading(false);
      }
      setLoading(false);

      return response;
    },
    [repository],
  );

  const exportCompaniesExcel = async () => {
    const response = await exportCompanies(repository, token);

    if (response && response instanceof Blob) {
      const href = await URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = href;
      link.download = `companies`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(href);
    }
    return response;
  };
  const exportCompanyBillingExcel = async () => {
    const response = await exportCompanyBilling(repository, token);

    if (response && response instanceof Blob) {
      const href = await URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = href;
      link.download = `billing`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(href);
    }
    return response;
  };
  const postCompany = async (company: FormData) => {
    setLoading(true);
    const response = await registerCompany(repository, company);

    if (isHttpSuccessResponse(response)) {
      setCompany(response.data);
      setLoading(false);
    }

    setLoading(false);
    setIsSuccess(response.success);

    return response;
  };

  const getCompaniesStatusBadge = useCallback(async () => {
    const response = await getCompaniesBadge(repository);

    if (isHttpSuccessResponse(response)) {
      setBadgeCount(response.data);
    }

    return response;
  }, [repository]);

  const getCompaniesWithParams = useCallback(
    async (params: FilterParams) => {
      const response = await getCompanies(repository, params);

      if (isHttpSuccessResponse(response)) {
        setCompanies(response.data);
      }

      return response;
    },
    [repository],
  );

  const getCompaniesPaginated = useCallback(
    async (page: number, per_page: number, filters?: FilterParams) => {
      setLoading(true);
      const response = await getCompaniesWithPagination(
        repository,
        page,
        per_page,
        filters!,
      );

      if (isHttpSuccessResponse(response)) {
        setCompanies(response.data.companies);
        setPagination(response.data.pagination);
      }

      setLoading(false);

      return response;
    },
    [repository],
  );

  const postCompanyCms = async (company: FormData) => {
    setLoading(true);
    const response = await postNewCompany(repository, company);

    if (isHttpSuccessResponse(response)) {
      setCompany(response.data);
      setLoading(false);
      setIsSuccess(true);
    } else {
      setIsError(Boolean(response.error));
    }

    setLoading(false);
    setIsSuccess(response.success);

    return response;
  };

  const editCompanyCms = async (company: FormData, id?: number) => {
    setLoading(true);
    const response = await editCompany(repository, company, id!);

    if (isHttpSuccessResponse(response)) {
      setCompany(response.data);
      setLoading(false);
      setIsSuccess(true);
    } else {
      setIsError(Boolean(response.error));
    }

    setLoading(false);
    setIsSuccess(response.success);

    return response;
  };

  return (
    <CompanyContext.Provider
      value={{
        loading,
        isSuccess,
        isError,
        company,
        badgeCount,
        companies,
        pagination,
        orderCompanies,
        setOrderCompanies,
        getCompaniesPaginated,
        getCompaniesWithParams,
        getCompany,
        deleteCompanyById,
        postCompany,
        getCompaniesStatusBadge,
        postCompanyCms,
        editCompanyCms,
        exportCompaniesExcel,
        exportCompanyBillingExcel,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
