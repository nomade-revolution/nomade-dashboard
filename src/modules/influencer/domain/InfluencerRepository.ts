import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import { EditInfluencerSocials } from "./InfluencerSocialMedia";
import { RegisterInfluencerInterface } from "@auth";

export interface InfluencerRepository<I> {
  deleteInfluencer(influencer_id: number): Promise<HttpResponseInterface<I>>;
  getInfluencerById(influencer_id: number): Promise<HttpResponseInterface<I>>;
  getInfluencersBadge(): Promise<HttpResponseInterface<I>>;
  getInfluencers(params: FilterParams): Promise<HttpResponseInterface<I>>;
  editInfluencerStats(
    data: EditInfluencerSocials,
    influencer_id: number,
  ): Promise<HttpResponseInterface<I>>;
  registerInfluencer(
    data: Partial<RegisterInfluencerInterface>,
  ): Promise<HttpResponseInterface<I>>;
}
