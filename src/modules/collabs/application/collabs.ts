import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { CollabsApiResponse } from "../domain/Collabs";
import { CollabsRepository } from "../domain/CollabsRepository";

export const collabsGetAll = (
  collabsRepo: CollabsRepository<CollabsApiResponse>,
  page: number,
  per_page: number,
): Promise<HttpResponseInterface<CollabsApiResponse>> => {
  return collabsRepo.getAllCollabs(page, per_page);
};

export const deleteCollab = (
  collabsRepo: CollabsRepository<CollabsApiResponse>,
  collab_id: number,
): Promise<HttpResponseInterface<{ success: boolean }>> => {
  return collabsRepo.deleteCollab(collab_id);
};
