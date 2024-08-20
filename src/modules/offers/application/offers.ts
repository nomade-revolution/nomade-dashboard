import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { FullOffer, OffersApiResponse } from "../domain/Offer";
import { OffersRepository } from "../domain/OffersRepository";
import { FilterParams } from "../../../sections/shared/interfaces/interfaces";

export const offersGetAll = (
  offersRepo: OffersRepository<OffersApiResponse>,
  page: number,
  per_page: number,
  params: FilterParams,
): Promise<HttpResponseInterface<OffersApiResponse>> => {
  return offersRepo.getAllOffers(page, per_page, params);
};

export const deleteOffer = (
  offersRepo: OffersRepository<OffersApiResponse>,
  offer_id: number,
): Promise<HttpResponseInterface<{ success: boolean }>> => {
  return offersRepo.deleteOffer(offer_id);
};

export const getOfferById = (
  offersRepo: OffersRepository<FullOffer>,
  offer_id: number,
): Promise<HttpResponseInterface<FullOffer>> => {
  return offersRepo.getOfferById(offer_id);
};
