import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export interface InfluencerRepository<I> {
  deleteInfluencer(influencer_id: number): Promise<HttpResponseInterface<I>>;
  getInfluencerById(influencer_id: number): Promise<HttpResponseInterface<I>>;
  getInfluencersBadge(): Promise<HttpResponseInterface<I>>;
  getInfluencers(params: FilterParams): Promise<HttpResponseInterface<I>>;
}
