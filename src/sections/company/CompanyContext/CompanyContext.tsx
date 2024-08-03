import React, { createContext, useState } from "react";
import { CompanyRepository } from "@company/domain/CompanyRepository";
import { deleteCompany } from "@company/application/company";

interface ContextState {
  loading: boolean;
  isSuccess: boolean;
  deleteCompanyById: (influencer_id: number) => void;
}

export const CompanyContext = createContext<ContextState>({} as ContextState);

export const CompanyContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: CompanyRepository<{ success: boolean }>;
}>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const deleteCompanyById = async (company_id: number) => {
    setLoading(true);
    const response = await deleteCompany(repository, company_id);

    setLoading(false);

    setIsSuccess(response.success);

    return response;
  };

  return (
    <CompanyContext.Provider
      value={{
        loading,
        isSuccess,
        deleteCompanyById,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
