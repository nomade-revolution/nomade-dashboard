import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import {
  FilterParams,
  PaginationStucture,
} from "sections/shared/interfaces/interfaces";
import { LeadsRepository } from "modules/leads/domain/LeadsRepository";
import { Lead, LeadsApiResponse } from "modules/leads/domain/Leads";
import {
  getLeads,
  getLeadsForm,
  sendLeadLink,
} from "modules/leads/application/leads";
import { CompanyRegisterStructure } from "modules/user/domain/User";
import { OrderItem } from "sections/user/UserContext/UserContext";

interface ContextState {
  leads: Lead[];
  lead: CompanyRegisterStructure;
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  pagination: PaginationStucture;
  getLeadsPaginated: (
    page: number,
    per_page: number,
    params: FilterParams,
  ) => void;
  setOrder: (order: OrderItem) => void;
  order: OrderItem;
  sendLinkForLead: (lead_id: number) => void;
  getLeadFromHash: (hash: string) => void;
}

export const LeadsContext = createContext<ContextState>({} as ContextState);

export const LeadsContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: LeadsRepository<LeadsApiResponse>;
}>) => {
  const [order, setOrder] = useState<OrderItem>({} as OrderItem);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [lead, setLead] = useState<CompanyRegisterStructure>(
    {} as CompanyRegisterStructure,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getLeadsPaginated = useCallback(
    async (page: number, per_page: number, params: FilterParams) => {
      setLoading(true);
      setError(null);

      const response = await getLeads(repository, page, per_page, params);
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

  const getLeadFromHash = useCallback(
    async (hash: string) => {
      setLoading(true);
      const response = await getLeadsForm(repository, hash);
      if (isHttpSuccessResponse(response)) {
        setLead(response.data);
      }
      setLoading(false);
      setIsSuccess(response.success);

      setTimeout(() => setIsSuccess(false), 3000);

      return response;
    },
    [repository],
  );

  setTimeout(() => setIsSuccess(false), 2000);

  return (
    <LeadsContext.Provider
      value={{
        leads,
        lead,
        loading,
        error,
        isSuccess,
        pagination,
        getLeadsPaginated,
        sendLinkForLead,
        getLeadFromHash,
        order,
        setOrder,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};
