import React, { createContext, useCallback, useState } from "react";
import {
  deleteInfluencer,
  getInfluencerById,
} from "@influencer/application/influencer";
import { InfluencerRepository } from "@influencer/domain/InfluencerRepository";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { Influencer } from "@influencer";

interface ContextState {
  loading: boolean;
  isSuccess: boolean;
  influencer: Influencer;
  deleteInfluencerById: (influencer_id: number) => void;
  getInfluencer: (influencer_id: number) => void;
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

  const deleteInfluencerById = async (influencer_id: number) => {
    setLoading(true);
    const response = await deleteInfluencer(repository, influencer_id);

    setLoading(false);

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

  return (
    <InfluencerContext.Provider
      value={{
        loading,
        isSuccess,
        influencer,
        deleteInfluencerById,
        getInfluencer,
      }}
    >
      {children}
    </InfluencerContext.Provider>
  );
};
