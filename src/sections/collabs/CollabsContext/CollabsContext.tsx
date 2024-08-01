import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { FullOffer } from "modules/offers/domain/Offer";
import { CollabsRepository } from "modules/collabs/domain/CollabsRepository";
import { collabsGetAll } from "modules/collabs/application/collabs";
import { FullCollab } from "modules/collabs/domain/Collabs";
import { PaginationStucture } from "sections/shared/interfaces/interfaces";

interface ContextState {
  collabs: FullCollab[];
  loading: boolean;
  error: string | null;
  pagination: PaginationStucture;
  getAllCollabs: (page: number, per_page: number) => void;
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

  const getAllCollabs = useCallback(
    async (page: number, per_page: number) => {
      setLoading(true);
      setError(null);

      const response = await collabsGetAll(repository, page, per_page);
      if (isHttpSuccessResponse(response)) {
        setLoading(false);
        setCollabs(response.data.colabs);
        setPagination(response.data.pagination);
      }
    },
    [repository],
  );

  return (
    <CollabsContext.Provider
      value={{
        collabs,
        loading,
        error,
        pagination,
        getAllCollabs,
      }}
    >
      {children}
    </CollabsContext.Provider>
  );
};
