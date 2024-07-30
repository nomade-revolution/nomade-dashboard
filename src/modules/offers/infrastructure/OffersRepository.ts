import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { GET_OFFERS } from "../application/routes";
import { OffersApiResponse } from "../domain/Offer";

export class OffersRepository {
  private readonly http: Http = Http.getInstance();

  public async getAllOffers(
    page: number,
    per_page: number,
  ): Promise<HttpResponseInterface<OffersApiResponse>> {
    try {
      const resp = await this.http.get<OffersApiResponse>(GET_OFFERS, {
        page,
        per_page,
      });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
