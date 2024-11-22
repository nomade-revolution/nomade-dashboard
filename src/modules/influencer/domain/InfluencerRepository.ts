import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import { SocialMedia } from "./InfluencerSocialMedia";

export interface InfluencerRepository<I> {
  deleteInfluencer(influencer_id: number): Promise<HttpResponseInterface<I>>;
  getInfluencerById(influencer_id: number): Promise<HttpResponseInterface<I>>;
  getInfluencersBadge(): Promise<HttpResponseInterface<I>>;
  getInfluencers(params: FilterParams): Promise<HttpResponseInterface<I>>;
  editInfluencerStats(
    data: SocialMedia,
    influencer_id: number,
  ): Promise<HttpResponseInterface<I>>;
}
