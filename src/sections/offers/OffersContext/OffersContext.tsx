import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import {
  deleteOffer,
  getOfferById,
  offersGetAll,
} from "modules/offers/application/offers";
import { FullOffer } from "modules/offers/domain/Offer";
import { OffersRepository } from "modules/offers/domain/OffersRepository";
import {
  FilterParams,
  PaginationStucture,
} from "sections/shared/interfaces/interfaces";

interface ContextState {
  offers: FullOffer[];
  offer: FullOffer;
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  pagination: PaginationStucture;
  getAllOffers: (page: number, per_page: number, params: FilterParams) => void;
  deleteOfferById: (offer_id: number) => void;
  getOffer: (offer_id: number) => void;
}

export const OffersContext = createContext<ContextState>({} as ContextState);

export const OffersContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: OffersRepository<FullOffer[]> }>) => {
  const [offers, setOffers] = useState<FullOffer[]>([]);
  const [offer, setOffer] = useState<FullOffer>({} as FullOffer);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getAllOffers = useCallback(
    async (page: number, per_page: number, params: FilterParams) => {
      setLoading(true);
      setError(null);

      const response = await offersGetAll(repository, page, per_page, params);
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

  const getOffer = useCallback(
    async (offer_id: number) => {
      setLoading(true);
      const response = await getOfferById(repository, offer_id);
      if (isHttpSuccessResponse(response)) {
        setOffer(response.data);
      }
      setLoading(false);
    },
    [repository],
  );

  return (
    <OffersContext.Provider
      value={{
        offers,
        offer,
        loading,
        error,
        pagination,
        isSuccess,
        getAllOffers,
        deleteOfferById,
        getOffer,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};
