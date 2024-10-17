import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { Plan } from "modules/plans/domain/Plan";
import { PlansRepository } from "modules/plans/domain/PlansRepository";
import { getCompaniesPlans } from "modules/plans/application/plans";

interface ContextState {
  loading: boolean;
  plans: Plan[];
  getPlans: () => void;
}

export const PlansContext = createContext<ContextState>({} as ContextState);

export const PlansContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: PlansRepository<Plan[]>;
}>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [plans, setPlans] = useState<Plan[]>([]);

  const getPlans = useCallback(async () => {
    setLoading(true);
    const response = await getCompaniesPlans(repository);

    if (isHttpSuccessResponse(response)) {
      setPlans(response.data);
      setLoading(false);
    }
    setLoading(false);

    return response;
  }, [repository]);

  return (
    <PlansContext.Provider
      value={{
        loading,
        plans,
        getPlans,
      }}
    >
      {children}
    </PlansContext.Provider>
  );
};
