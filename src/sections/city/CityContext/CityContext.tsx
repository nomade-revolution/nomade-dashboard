import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { CityInterface } from "@city";
import { CityRepository } from "@city/domain/CityRepository";
import { getCities } from "@city/application/city";
import { FilterParams } from "sections/shared/interfaces/interfaces";

interface ContextState {
  cities: CityInterface[];
  loading: boolean;
  error: string | null;
  getAllCities: (filterParams: FilterParams) => void;
}

export const CityContext = createContext<ContextState>({} as ContextState);

export const CityContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: CityRepository<CityInterface[]>;
}>) => {
  const [cities, setCities] = useState<CityInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllCities = useCallback(
    async (filterParams: FilterParams) => {
      setLoading(true);
      setError(null);

      const response = await getCities(repository, filterParams);
      if (isHttpSuccessResponse(response)) {
        setLoading(false);
        setCities(response.data);
      }
    },
    [repository],
  );

  return (
    <CityContext.Provider
      value={{
        cities,
        loading,
        error,
        getAllCities,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};
