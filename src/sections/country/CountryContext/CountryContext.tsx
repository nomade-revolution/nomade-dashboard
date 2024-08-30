import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";

import { CountryRepository } from "@country/domain/CountryRepository";
import { CountryInterface } from "@country";
import { getCountries } from "@country/application/country";

interface ContextState {
  countries: CountryInterface[];
  loading: boolean;
  error: string | null;
  getAllCountries: () => void;
}

export const CountryContext = createContext<ContextState>({} as ContextState);

export const CountryContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: CountryRepository<CountryInterface[]>;
}>) => {
  const [countries, setCountries] = useState<CountryInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllCountries = useCallback(async () => {
    setLoading(true);
    setError(null);

    const response = await getCountries(repository);
    if (isHttpSuccessResponse(response)) {
      setLoading(false);
      setCountries(response.data);
    }
  }, [repository]);

  return (
    <CountryContext.Provider
      value={{
        countries,
        loading,
        error,
        getAllCountries,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};
