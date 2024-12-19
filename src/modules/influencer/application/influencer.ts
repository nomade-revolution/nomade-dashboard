import { RegisterInfluencerInterface } from "@auth";
import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { Influencer } from "@influencer/domain";
import { InfluencerRepository } from "@influencer/domain/InfluencerRepository";
import { EditInfluencerSocials } from "@influencer/domain/InfluencerSocialMedia";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export const deleteInfluencer = (
  influencerRepo: InfluencerRepository<{ succes: boolean }>,
  influencer_id: number,
): Promise<HttpResponseInterface<{ success: boolean }>> => {
  return influencerRepo.deleteInfluencer(influencer_id);
};

export const getInfluencerById = (
  influencerRepo: InfluencerRepository<Influencer>,
  influencer_id: number,
): Promise<HttpResponseInterface<Influencer>> => {
  return influencerRepo.getInfluencerById(influencer_id);
};

export const getInfluencersBadge = (
  influencerRepo: InfluencerRepository<number>,
) => {
  return influencerRepo.getInfluencersBadge();
};

export const getInfluencers = (
  influencerRepo: InfluencerRepository<Influencer[]>,
  params: FilterParams,
) => {
  return influencerRepo.getInfluencers(params);
};

export const editInfluencerStats = (
  influencerRepo: InfluencerRepository<Influencer>,
  data: EditInfluencerSocials,
  influencer_id: number,
) => {
  return influencerRepo.editInfluencerStats(data, influencer_id);
};

export const registerNewInfluencer = (
  influencerRepo: InfluencerRepository<Influencer>,
  data: Partial<RegisterInfluencerInterface>,
) => {
  return influencerRepo.registerInfluencer(data);
};
export const getCategoriesInfluencer = (
  influencerRepo: InfluencerRepository<Influencer>,
) => {
  return influencerRepo.getCategories();
};
