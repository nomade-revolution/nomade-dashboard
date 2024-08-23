import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import {
  CollabsApiResponse,
  FullCollab,
  RejectedCollab,
} from "../domain/Collabs";
import { CollabsRepository } from "../domain/CollabsRepository";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export const collabsGetAll = (
  collabsRepo: CollabsRepository<CollabsApiResponse>,
  page: number,
  per_page: number,
  params: FilterParams,
): Promise<HttpResponseInterface<CollabsApiResponse>> => {
  return collabsRepo.getAllCollabs(page, per_page, params);
};

export const deleteCollab = (
  collabsRepo: CollabsRepository<CollabsApiResponse>,
  collab_id: number,
): Promise<HttpResponseInterface<{ success: boolean }>> => {
  return collabsRepo.deleteCollab(collab_id);
};

export const updateCollabHistoryState = (
  collabsRepo: CollabsRepository<FullCollab>,
  collab_id: number,
  state_id: number,
  rejected_collab_reason_id?: number,
): Promise<HttpResponseInterface<FullCollab>> => {
  return collabsRepo.updateCollabHistoryState(
    collab_id,
    state_id,
    rejected_collab_reason_id,
  );
};

export const getRejectedCollabReasons = (
  collabsRepo: CollabsRepository<RejectedCollab[]>,
): Promise<HttpResponseInterface<RejectedCollab[]>> => {
  return collabsRepo.getRejectedCollabReasons();
};

export const getCollab = (
  collabsRepo: CollabsRepository<FullCollab>,
  collab_id: number,
): Promise<HttpResponseInterface<FullCollab>> => {
  return collabsRepo.getCollab(collab_id);
};
