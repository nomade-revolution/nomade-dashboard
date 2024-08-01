import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { offersGetAll } from "modules/offers/application/offers";
import { FullOffer } from "modules/offers/domain/Offer";
import { OffersRepository } from "modules/offers/domain/OffersRepository";
import { PaginationStucture } from "sections/shared/interfaces/interfaces";

interface ContextState {
  offers: FullOffer[];
  loading: boolean;
  error: string | null;
  pagination: PaginationStucture;
  getAllOffers: (page: number, per_page: number) => void;
}

export const OffersContext = createContext<ContextState>({} as ContextState);

export const OffersContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: OffersRepository<FullOffer[]> }>) => {
  const [offers, setOffers] = useState<FullOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );

  const getAllOffers = useCallback(
    async (page: number, per_page: number) => {
      setLoading(true);
      setError(null);

      const response = await offersGetAll(repository, page, per_page);
      if (isHttpSuccessResponse(response)) {
        setOffers(response.data.offers);
        setPagination(response.data.pagination);
        setLoading(false);
      }
    },
    [repository],
  );

  return (
    <OffersContext.Provider
      value={{
        offers,
        loading,
        error,
        pagination,
        getAllOffers,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};
