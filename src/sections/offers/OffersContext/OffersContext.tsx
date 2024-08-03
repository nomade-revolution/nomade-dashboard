import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { deleteOffer, offersGetAll } from "modules/offers/application/offers";
import { FullOffer } from "modules/offers/domain/Offer";
import { OffersRepository } from "modules/offers/domain/OffersRepository";
import { PaginationStucture } from "sections/shared/interfaces/interfaces";

interface ContextState {
  offers: FullOffer[];
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  pagination: PaginationStucture;
  getAllOffers: (page: number, per_page: number) => void;
  deleteOfferById: (offer_id: number) => void;
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
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

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

  const deleteOfferById = async (offer_id: number) => {
    const response = await deleteOffer(repository, offer_id);

    setIsSuccess(response.success);

    return response;
  };

  return (
    <OffersContext.Provider
      value={{
        offers,
        loading,
        error,
        pagination,
        isSuccess,
        getAllOffers,
        deleteOfferById,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};
