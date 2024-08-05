import { HttpResponseInterface } from "@core";

export interface CollabsRepository<I> {
  getAllCollabs(
    page: number,
    per_page: number,
    influencer_id?: number,
  ): Promise<HttpResponseInterface<I>>;
  deleteCollab(collab_id: number): Promise<HttpResponseInterface<I>>;
}
