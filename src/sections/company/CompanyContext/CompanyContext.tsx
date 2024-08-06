import React, { createContext, useCallback, useState } from "react";
import { CompanyRepository } from "@company/domain/CompanyRepository";
import { deleteCompany, getCompanyById } from "@company/application/company";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { Company } from "modules/user/domain/User";

interface ContextState {
  loading: boolean;
  isSuccess: boolean;
  company: Company;
  deleteCompanyById: (company_id: number) => void;
  getCompany: (company_id: number) => void;
}

export const CompanyContext = createContext<ContextState>({} as ContextState);

export const CompanyContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: CompanyRepository<{ success: boolean; company: Company }>;
}>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [company, setCompany] = useState<Company>({} as Company);

  const deleteCompanyById = async (company_id: number) => {
    setLoading(true);
    const response = await deleteCompany(repository, company_id);

    setLoading(false);

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

  return (
    <CompanyContext.Provider
      value={{
        loading,
        isSuccess,
        company,
        getCompany,
        deleteCompanyById,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
