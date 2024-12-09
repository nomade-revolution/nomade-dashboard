import React, { createContext, useCallback, useState } from "react";
import {
  deleteInfluencer,
  getInfluencerById,
  getInfluencersBadge,
  getInfluencers,
  editInfluencerStats,
  registerNewInfluencer,
} from "@influencer/application/influencer";
import { InfluencerRepository } from "@influencer/domain/InfluencerRepository";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { Influencer } from "@influencer";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import { EditInfluencerStatsStructure } from "@influencer/domain/InfluencerSocialMedia";
import { RegisterInfluencerInterface } from "@auth";

interface InfluencerCategory {
  id: number;
  name: string;
  parent_id: number | null;
}

interface ContextState {
  loading: boolean;
  isSuccess: boolean;
  influencer: Influencer;
  badgeCount: number;
  error: string;
  influencers: Influencer[];
  deleteInfluencerById: (influencer_id: number) => void;
  getInfluencer: (influencer_id: number) => void;
  getInfluencersStatusBadge: () => void;
  getInfluencersWithParams: (params: FilterParams) => void;
  modifyInfluencerStats: (
    influencer_id: number,
    stats: EditInfluencerStatsStructure,
  ) => void;
  registerInfluencer: (data: Partial<RegisterInfluencerInterface>) => void;
  influencerCategories: InfluencerCategory[];
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
  const [influencerCategories] = useState<InfluencerCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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
        setInfluencers(response.data);
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

  const modifyInfluencerStats = useCallback(
    async (influencer_id: number, stats: EditInfluencerStatsStructure) => {
      const response = await editInfluencerStats(
        repository,
        stats,
        influencer_id,
      );

      if (isHttpSuccessResponse(response)) {
        setInfluencer(response.data);
        setIsSuccess(true);
      } else {
        setError(response.error as never);
      }

      return response;
    },
    [repository],
  );

  const registerInfluencer = useCallback(
    async (data: Partial<RegisterInfluencerInterface>) => {
      const response = await registerNewInfluencer(repository, data);

      if (isHttpSuccessResponse(response)) {
        setInfluencer(response.data);
        setIsSuccess(true);
      } else {
        setError(response.error as never);
      }

      return response;
    },
    [repository],
  );

  setTimeout(() => setIsSuccess(false), 3000);
  return (
    <InfluencerContext.Provider
      value={{
        influencerCategories,

        registerInfluencer,
        loading,
        isSuccess,
        influencer,
        badgeCount,
        influencers,
        error,
        deleteInfluencerById,
        getInfluencer,
        getInfluencersStatusBadge,
        getInfluencersWithParams,
        modifyInfluencerStats,
      }}
    >
      {children}
    </InfluencerContext.Provider>
  );
};
