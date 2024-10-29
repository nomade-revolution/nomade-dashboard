import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { Influencer } from "@influencer/domain";
import { InfluencerRepository } from "@influencer/domain/InfluencerRepository";
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
