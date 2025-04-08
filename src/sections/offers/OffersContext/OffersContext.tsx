import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import {
  createOffer,
  deleteOffer,
  editOffer,
  exportOffers,
  getOfferById,
  getOfferCategoriesList,
  offersGetAll,
} from "modules/offers/application/offers";
import { FullOffer } from "modules/offers/domain/Offer";
import { OffersRepository } from "modules/offers/domain/OffersRepository";
import {
  FilterParams,
  PaginationStucture,
} from "sections/shared/interfaces/interfaces";
import { OrderItem } from "sections/user/UserContext/UserContext";
import { HttpResponseInterface } from "@core";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";

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
  createNewOffer: (offer: FormData) => Promise<
    HttpResponseInterface<{
      data: FullOffer;
      success: boolean;
      error: string;
    }>
  >;
  modifyOffer: (offer: FormData, offer_id?: number) => void;
  order: OrderItem;
  setOrder: (order: OrderItem) => void;
  getOfferCategories: () => Promise<HttpResponseInterface<FullOffer>>;
  exportOffersExcel: () => void;
}

export const OffersContext = createContext<ContextState>({} as ContextState);

export const OffersContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: OffersRepository<FullOffer[]> }>) => {
  const [offers, setOffers] = useState<FullOffer[]>([]);
  const [offer, setOffer] = useState<FullOffer>({} as FullOffer);
  const [order, setOrder] = useState<OrderItem>({} as OrderItem);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );

  const { token } = useAuthContext();
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

  const exportOffersExcel = async () => {
    const response = await exportOffers(repository, token);

    if (response && response instanceof Blob) {
      const href = await URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = href;
      link.download = `collabs`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(href);
    }
    return response;
  };

  const getOfferCategories = useCallback(async () => {
    const response = await getOfferCategoriesList(repository);
    // @ts-expect-error TODO fix this
    return response.data;
  }, [repository]);

  const createNewOffer = async (offer: FormData) => {
    const response = await createOffer(repository, offer);

    if (isHttpSuccessResponse(response)) {
      setOffer(response.data.data);
      setIsSuccess(true);
    } else {
      setError(response.error as never);
    }

    setTimeout(() => {
      setIsSuccess(false);
      setError("");
    }, 3000);

    return response;
  };

  const modifyOffer = async (offer: FormData, offer_id?: number) => {
    setLoading(true);
    const response = await editOffer(repository, offer, offer_id!);

    if (isHttpSuccessResponse(response)) {
      setIsSuccess(true);
      const newOffers = offers.map((prevOffer) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (prevOffer.id === (response as any).data.id) {
          return response.data;
        }
        return prevOffer;
      });
      setOffers(newOffers as unknown as FullOffer[]);
      setOffer(response.data as unknown as FullOffer);
    } else {
      setError(response.error as never);
    }

    setTimeout(() => {
      setIsSuccess(false);
      setError("");
    }, 3000);
    setLoading(false);
    return response;
  };

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
        createNewOffer,
        getOfferCategories,
        modifyOffer,
        order,
        setOrder,
        exportOffersExcel,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};
