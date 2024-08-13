import { HttpResponseInterface } from "@core";

export interface InfluencerRepository<I> {
  deleteInfluencer(influencer_id: number): Promise<HttpResponseInterface<I>>;
  getInfluencerById(influencer_id: number): Promise<HttpResponseInterface<I>>;
}
