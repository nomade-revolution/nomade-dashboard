import { HttpResponseInterface } from "@core";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export interface OffersRepository<I> {
  getAllOffers(
    page: number,
    per_page: number,
    params: FilterParams,
  ): Promise<HttpResponseInterface<I>>;
  deleteOffer(offer_id: number): Promise<HttpResponseInterface<I>>;
  getOfferById(offer_id: number): Promise<HttpResponseInterface<I>>;
  createOffer(offer: FormData): Promise<HttpResponseInterface<I>>;
  editOffer(
    offer: FormData,
    offer_id: number,
  ): Promise<HttpResponseInterface<I>>;
}
