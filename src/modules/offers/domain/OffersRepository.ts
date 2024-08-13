import { HttpResponseInterface } from "@core";

export interface OffersRepository<I> {
  getAllOffers(
    page: number,
    per_page: number,
  ): Promise<HttpResponseInterface<I>>;
  deleteOffer(offer_id: number): Promise<HttpResponseInterface<I>>;
  getOfferById(offer_id: number): Promise<HttpResponseInterface<I>>;
}
