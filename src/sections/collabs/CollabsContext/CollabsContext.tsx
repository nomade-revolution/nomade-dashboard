import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { FullOffer } from "modules/offers/domain/Offer";
import { CollabsRepository } from "modules/collabs/domain/CollabsRepository";
import {
  collabsGetAll,
  deleteCollab,
} from "modules/collabs/application/collabs";
import { FullCollab } from "modules/collabs/domain/Collabs";
import { PaginationStucture } from "sections/shared/interfaces/interfaces";

interface ContextState {
  collabs: FullCollab[];
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  pagination: PaginationStucture;
  getAllCollabs: (
    page: number,
    per_page: number,
    influencer_id?: number | undefined,
    company_id?: number | undefined,
  ) => void;
  deleteCollabById: (influencer_id: number) => void;
}

export const CollabsContext = createContext<ContextState>({} as ContextState);

export const CollabsContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: CollabsRepository<FullOffer[]> }>) => {
  const [collabs, setCollabs] = useState<FullCollab[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationStucture>(
    {} as PaginationStucture,
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getAllCollabs = useCallback(
    async (
      page: number,
      per_page: number,
      influencer_id?: number | undefined,
      company_id?: number | undefined,
    ) => {
      setLoading(true);
      setError(null);

      const response = await collabsGetAll(
        repository,
        page,
        per_page,
        influencer_id,
        company_id,
      );
      if (isHttpSuccessResponse(response)) {
        setLoading(false);
        setCollabs(response.data.colabs);
        setPagination(response.data.pagination);
      }
    },
    [repository],
  );

  const deleteCollabById = async (collab_id: number) => {
    setLoading(true);
    const response = await deleteCollab(repository, collab_id);

    setLoading(false);

    setIsSuccess(response.success);

    return response;
  };

  return (
    <CollabsContext.Provider
      value={{
        collabs,
        loading,
        error,
        isSuccess,
        pagination,
        getAllCollabs,
        deleteCollabById,
      }}
    >
      {children}
    </CollabsContext.Provider>
  );
};
