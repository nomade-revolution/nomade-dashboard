import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { OffersApiResponse } from "../domain/Offer";
import { OffersRepository } from "../domain/OffersRepository";

export const offersGetAll = (
  offersRepo: OffersRepository<OffersApiResponse>,
  page: number,
  per_page: number,
): Promise<HttpResponseInterface<OffersApiResponse>> => {
  return offersRepo.getAllOffers(page, per_page);
};
