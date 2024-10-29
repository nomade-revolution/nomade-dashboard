import React, { createContext, useCallback, useState } from "react";
import {
  deleteInfluencer,
  getInfluencerById,
  getInfluencersBadge,
  getInfluencers,
} from "@influencer/application/influencer";
import { InfluencerRepository } from "@influencer/domain/InfluencerRepository";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { Influencer } from "@influencer";
import { FilterParams } from "sections/shared/interfaces/interfaces";

interface ContextState {
  loading: boolean;
  isSuccess: boolean;
  influencer: Influencer;
  badgeCount: number;
  influencers: Influencer[];
  deleteInfluencerById: (influencer_id: number) => void;
  getInfluencer: (influencer_id: number) => void;
  getInfluencersStatusBadge: () => void;
  getInfluencersWithParams: (params: FilterParams) => void;
}

export const InfluencerContext = createContext<ContextState>(
  {} as ContextState,
);

export const InfluencerContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: InfluencerRepository<{ success: boolean }>;
}>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [influencer, setInfluencer] = useState<Influencer>({} as Influencer);
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);

  const deleteInfluencerById = async (influencer_id: number) => {
    const response = await deleteInfluencer(repository, influencer_id);

    setIsSuccess(response.success);

    return response;
  };

  const getInfluencer = useCallback(
    async (influencer_id: number) => {
      setLoading(true);
      const response = await getInfluencerById(repository, influencer_id);

      if (isHttpSuccessResponse(response)) {
        setInfluencer(response.data);
        setLoading(false);
      }
      setLoading(false);

      return response;
    },
    [repository],
  );
  const getInfluencersWithParams = useCallback(
    async (params: FilterParams) => {
      setLoading(true);

      const response = await getInfluencers(repository, params);
      if (isHttpSuccessResponse(response)) {
        setInfluencers(
          (response.data as unknown as { influencers: Influencer[] })
            .influencers,
        );
        setLoading(false);
      }
      setLoading(false);
      return response;
    },
    [repository],
  );
  const getInfluencersStatusBadge = useCallback(async () => {
    const response = await getInfluencersBadge(repository);

    if (isHttpSuccessResponse(response)) {
      setBadgeCount(response.data);
    }

    return response;
  }, [repository]);
  return (
    <InfluencerContext.Provider
      value={{
        loading,
        isSuccess,
        influencer,
        badgeCount,
        influencers,
        deleteInfluencerById,
        getInfluencer,
        getInfluencersStatusBadge,
        getInfluencersWithParams,
      }}
    >
      {children}
    </InfluencerContext.Provider>
  );
};
