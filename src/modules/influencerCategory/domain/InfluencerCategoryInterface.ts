import { Influencer } from "@influencer";

export interface InfluencerCategoryInterface {
  id: number;
  name: string;
  parent_id: string;
  parent?: InfluencerCategoryInterface;
  children?: Influencer;
}
