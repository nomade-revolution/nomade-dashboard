import { HttpResponseInterface } from "@core";

export interface CollabsRepository<I> {
  getAllCollabs(
    page: number,
    per_page: number,
    influencer_id?: number | undefined,
    company_id?: number | undefined,
  ): Promise<HttpResponseInterface<I>>;
  deleteCollab(collab_id: number): Promise<HttpResponseInterface<I>>;
  updateCollabHistoryState(
    collab_id: number,
    state_id: number,
    rejected_colab_reason_id?: number,
  ): Promise<HttpResponseInterface<I>>;
  getRejectedCollabReasons(): Promise<HttpResponseInterface<I>>;
  getCollab(collab_id: number): Promise<HttpResponseInterface<I>>;
}
