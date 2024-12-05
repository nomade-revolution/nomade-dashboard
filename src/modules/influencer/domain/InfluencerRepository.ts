import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import { EditInfluencerStatsStructure } from "./InfluencerSocialMedia";
import { Influencer } from "./Influencer";

export interface InfluencerRepository<I> {
  deleteInfluencer(influencer_id: number): Promise<HttpResponseInterface<I>>;
  getInfluencerById(influencer_id: number): Promise<HttpResponseInterface<I>>;
  getInfluencersBadge(): Promise<HttpResponseInterface<I>>;
  getInfluencers(params: FilterParams): Promise<HttpResponseInterface<I>>;
  editInfluencerStats(
    data: EditInfluencerStatsStructure,
    influencer_id: number,
  ): Promise<HttpResponseInterface<I>>;
  registerInfluencer(
    data: Partial<Influencer>,
  ): Promise<HttpResponseInterface<I>>;
}
