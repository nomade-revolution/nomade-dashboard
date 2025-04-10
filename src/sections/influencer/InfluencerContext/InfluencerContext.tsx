import React, { createContext, useCallback, useState } from "react";
import {
  deleteInfluencer,
  getInfluencerById,
  getInfluencersBadge,
  getInfluencers,
  editInfluencerStats,
  registerNewInfluencer,
  getCategoriesInfluencer,
  editInfluencer,
} from "@influencer/application/influencer";
import { InfluencerRepository } from "@influencer/domain/InfluencerRepository";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { Influencer } from "@influencer";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import {
  EditInfluencerSocials,
  SocialMedia,
} from "@influencer/domain/InfluencerSocialMedia";
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
    stats: EditInfluencerSocials,
  ) => void;
  registerInfluencer: (data: Partial<RegisterInfluencerInterface>) => void;
  influencerCategories: InfluencerCategory[];
  getInfluencerCategories: () => void;
  parentInfluencerCategories: InfluencerCategory[];
  socialMediaSelected: SocialMedia;
  setSocialMediaSelected: (value: SocialMedia) => void;
  isSocialMediaModalOpen: boolean;
  setIsSocialMediaModalOpen: (value: boolean) => void;
  modifyInfluencer: (influencer_id: number, data: Partial<Influencer>) => void;
  setBadgeCount: (count: number) => void;
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
  const [influencerCategories, setInfluencerCategories] = useState<
    InfluencerCategory[]
  >([]);
  const [parentInfluencerCategories, setParentInfluencerCategories] = useState<
    InfluencerCategory[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [influencer, setInfluencer] = useState<Influencer>({} as Influencer);
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [socialMediaSelected, setSocialMediaSelected] = useState<SocialMedia>(
    {} as SocialMedia,
  );
  const [isSocialMediaModalOpen, setIsSocialMediaModalOpen] =
    useState<boolean>(false);

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

  const modifyInfluencer = useCallback(
    async (influencer_id: number, data: Partial<Influencer>) => {
      const response = await editInfluencer(repository, data, influencer_id);
      if (isHttpSuccessResponse(response)) {
        setIsSuccess(true);
      } else {
        setError(response.error as never);
      }

      return response;
    },
    [repository],
  );

  const modifyInfluencerStats = useCallback(
    async (influencer_id: number, stats: EditInfluencerSocials) => {
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
  const getInfluencerCategories = useCallback(async () => {
    const response = await getCategoriesInfluencer(repository);

    if (isHttpSuccessResponse(response)) {
      const categories = response.data as unknown as InfluencerCategory[];
      setInfluencerCategories(categories);
      const parentsCategories = categories.filter(
        (cat) => cat.parent_id === null,
      );
      setParentInfluencerCategories(parentsCategories);
      setIsSuccess(true);
    } else {
      setError(response.error as never);
    }

    return response;
  }, [repository]);

  setTimeout(() => setIsSuccess(false), 3000);
  return (
    <InfluencerContext.Provider
      value={{
        influencerCategories,
        getInfluencerCategories,
        parentInfluencerCategories,
        registerInfluencer,
        socialMediaSelected,
        setSocialMediaSelected,
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
        modifyInfluencer,
        isSocialMediaModalOpen,
        setIsSocialMediaModalOpen,
        setBadgeCount,
      }}
    >
      {children}
    </InfluencerContext.Provider>
  );
};
