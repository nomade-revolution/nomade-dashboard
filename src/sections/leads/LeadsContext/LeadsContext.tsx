import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { PaginationStucture } from "sections/shared/interfaces/interfaces";
import { LeadsRepository } from "modules/leads/domain/LeadsRepository";
import { Lead, LeadsApiResponse } from "modules/leads/domain/Leads";
import { getLeads, sendLeadLink } from "modules/leads/application/leads";

interface ContextState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  pagination: PaginationStucture;
  getLeadsPaginated: (page: number, per_page: number) => void;
  sendLinkForLead: (lead_id: number) => void;
}

export const LeadsContext = createContext<ContextState>({} as ContextState);

export const LeadsContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: LeadsRepository<LeadsApiResponse>;
}>) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getLeadsPaginated = useCallback(
    async (page: number, per_page: number) => {
      setLoading(true);
      setError(null);

      const response = await getLeads(repository, page, per_page);
      if (isHttpSuccessResponse(response)) {
        setLoading(false);
        setLeads(response.data.leads);
        setPagination(response.data.pagination);
      }
    },
    [repository],
  );

  const sendLinkForLead = async (lead_id: number) => {
    const response = await sendLeadLink(repository, lead_id);

    setIsSuccess(response.success);

    return response;
  };

  setTimeout(() => setIsSuccess(false), 2000);

  return (
    <LeadsContext.Provider
      value={{
        leads,
        loading,
        error,
        isSuccess,
        pagination,
        getLeadsPaginated,
        sendLinkForLead,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};
