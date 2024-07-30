import { HttpResponseInterface } from "@core";

export interface OffersRepository<I> {
  getAllOffers(
    page: number,
    per_page: number,
  ): Promise<HttpResponseInterface<I>>;
}
