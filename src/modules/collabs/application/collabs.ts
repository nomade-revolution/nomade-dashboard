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
  rejected_colab_reason_text?: string,
): Promise<HttpResponseInterface<FullCollab>> => {
  return collabsRepo.updateCollabHistoryState(
    collab_id,
    state_id,
    rejected_collab_reason_id,
    rejected_colab_reason_text,
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

export const createCollab = (
  collabsRepo: CollabsRepository<FullCollab>,
  collab: FormData,
): Promise<HttpResponseInterface<FullCollab>> => {
  return collabsRepo.createCollab(collab);
};

export const exportCollabs = (
  collabsRepo: CollabsRepository<FullCollab>,
  token: string,
): Promise<Blob> => {
  return collabsRepo.exportCollabs(token);
};

export const editCollabById = (
  collabsRepo: CollabsRepository<FullCollab>,
  id: number,
  colab: Partial<FullCollab>,
): Promise<HttpResponseInterface<FullCollab>> => {
  return collabsRepo.editCollabById(id, colab);
};

export const getCollabsBadge = (companyRepo: CollabsRepository<number>) => {
  return companyRepo.getCollabsBadge();
};
