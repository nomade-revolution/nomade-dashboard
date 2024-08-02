import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { InfluencerRepository } from "@influencer/domain/InfluencerRepository";

export const deleteInfluencer = (
  influencerRepo: InfluencerRepository<{ succes: boolean }>,
  influencer_id: number,
): Promise<HttpResponseInterface<{ success: boolean }>> => {
  return influencerRepo.deleteInfluencer(influencer_id);
};
