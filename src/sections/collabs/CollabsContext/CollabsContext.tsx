import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { FullOffer } from "modules/offers/domain/Offer";
import { CollabsRepository } from "modules/collabs/domain/CollabsRepository";
import {
  collabsGetAll,
  deleteCollab,
  getCollab,
  getRejectedCollabReasons,
  updateCollabHistoryState,
} from "modules/collabs/application/collabs";
import { FullCollab, RejectedCollab } from "modules/collabs/domain/Collabs";
import {
  FilterParams,
  PaginationStucture,
} from "sections/shared/interfaces/interfaces";
import { OrderItem } from "sections/user/UserContext/UserContext";

interface ContextState {
  collabs: FullCollab[];
  collab: FullCollab;
  collabRejectedReasons: RejectedCollab[];
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  pagination: PaginationStucture;
  getAllCollabs: (page: number, per_page: number, params: FilterParams) => void;
  deleteCollabById: (influencer_id: number) => void;
  updateCollabState: (
    collab_id: number,
    state_id: number,
    reject_collab_reason_id?: number,
  ) => void;
  getAllRejectedCollabReasons: () => void;
  setOrder: (order: OrderItem) => void;
  order: OrderItem;
  getCollabById: (collab_id: number) => void;
}

export const CollabsContext = createContext<ContextState>({} as ContextState);

export const CollabsContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: CollabsRepository<FullOffer[]> }>) => {
  const [collabs, setCollabs] = useState<FullCollab[]>([]);
  const [collab, setCollab] = useState<FullCollab>({} as FullCollab);
  const [collabRejectedReasons, setCollabRejectedReasons] = useState<
    RejectedCollab[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderItem>({} as OrderItem);

  const getAllCollabs = useCallback(
    async (page: number, per_page: number, params: FilterParams) => {
      setLoading(true);
      setError(null);
      const response = await collabsGetAll(repository, page, per_page, params);
      if (isHttpSuccessResponse(response)) {
        setLoading(false);
        setCollabs(response.data.colabs);
        setPagination(response.data.pagination);
      }
    },
    [repository],
  );

  const deleteCollabById = async (collab_id: number) => {
    const response = await deleteCollab(repository, collab_id);

    setIsSuccess(response.success);

    return response;
  };

  const updateCollabState = async (
    collab_id: number,
    state_id: number,
    rejected_collab_reason_id?: number,
  ) => {
    const response = await updateCollabHistoryState(
      repository,
      collab_id,
      state_id,
      rejected_collab_reason_id,
    );

    if (isHttpSuccessResponse(response)) {
      setCollab(response.data);
    }

    return response;
  };

  const getAllRejectedCollabReasons = useCallback(async () => {
    setError(null);

    const response = await getRejectedCollabReasons(repository);
    if (isHttpSuccessResponse(response)) {
      setCollabRejectedReasons(response.data);
    }
  }, [repository]);

  const getCollabById = useCallback(
    async (collab_id: number) => {
      setLoading(true);
      const response = await getCollab(repository, collab_id);

      if (isHttpSuccessResponse(response)) {
        setCollab(response.data);
      }

      setLoading(false);
    },
    [repository],
  );

  return (
    <CollabsContext.Provider
      value={{
        collabs,
        collab,
        collabRejectedReasons,
        loading,
        error,
        isSuccess,
        pagination,
        getAllCollabs,
        deleteCollabById,
        updateCollabState,
        getAllRejectedCollabReasons,
        order,
        setOrder,
        getCollabById,
      }}
    >
      {children}
    </CollabsContext.Provider>
  );
};
