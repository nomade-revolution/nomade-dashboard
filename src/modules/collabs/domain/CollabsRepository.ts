import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import { FullCollab } from "./Collabs";

export interface CollabsRepository<I> {
  getAllCollabs(
    page: number,
    per_page: number,
    params: FilterParams,
  ): Promise<HttpResponseInterface<I>>;
  deleteCollab(collab_id: number): Promise<HttpResponseInterface<I>>;
  updateCollabHistoryState(
    collab_id: number,
    state_id: number,
    rejected_colab_reason_id?: number,
  ): Promise<HttpResponseInterface<I>>;
  getRejectedCollabReasons(): Promise<HttpResponseInterface<I>>;
  getCollab(collab_id: number): Promise<HttpResponseInterface<I>>;
  createCollab(collab: FormData): Promise<HttpResponseInterface<I>>;
  exportCollabs(token: string): Promise<Blob>;
  editCollabById(
    id: number,
    collab: Partial<FullCollab>,
  ): Promise<HttpResponseInterface<FullCollab>>;
}
