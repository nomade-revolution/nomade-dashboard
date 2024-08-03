import React, { createContext, useState } from "react";
import { deleteInfluencer } from "@influencer/application/influencer";
import { InfluencerRepository } from "@influencer/domain/InfluencerRepository";

interface ContextState {
  loading: boolean;
  isSuccess: boolean;
  deleteInfluencerById: (influencer_id: number) => void;
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

  const deleteInfluencerById = async (user_id: number) => {
    setLoading(true);
    const response = await deleteInfluencer(repository, user_id);

    setLoading(false);

    setIsSuccess(response.success);

    return response;
  };

  return (
    <InfluencerContext.Provider
      value={{
        loading,
        isSuccess,
        deleteInfluencerById,
      }}
    >
      {children}
    </InfluencerContext.Provider>
  );
};
