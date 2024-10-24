import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { Plan, PlansApiResponse } from "modules/plans/domain/Plan";
import { PlansRepository } from "modules/plans/domain/PlansRepository";
import { getCompaniesPlans } from "modules/plans/application/plans";
import {
  FilterParams,
  PaginationStucture,
} from "sections/shared/interfaces/interfaces";

interface ContextState {
  loading: boolean;
  plans: Plan[];
  pagination: PaginationStucture;
  getPlans: (
    page: number,
    per_page: number,
    filterParams?: FilterParams,
  ) => void;
}

export const PlansContext = createContext<ContextState>({} as ContextState);

export const PlansContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: PlansRepository<PlansApiResponse>;
}>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );

  const getPlans = useCallback(
    async (page: number, per_page: number, filterParams?: FilterParams) => {
      setLoading(true);
      const response = await getCompaniesPlans(
        repository,
        page,
        per_page,
        filterParams,
      );

      if (isHttpSuccessResponse(response)) {
        setPlans(response.data.companies);
        setPagination(response.data.pagination);
        setLoading(false);
      }
      setLoading(false);

      return response;
    },
    [repository],
  );

  return (
    <PlansContext.Provider
      value={{
        loading,
        plans,
        pagination,
        getPlans,
      }}
    >
      {children}
    </PlansContext.Provider>
  );
};
