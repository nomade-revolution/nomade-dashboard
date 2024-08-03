import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { OFFERS_BASE } from "../application/routes";
import { OffersApiResponse } from "../domain/Offer";

export class OffersRepository {
  private readonly http: Http = Http.getInstance();

  public async getAllOffers(
    page: number,
    per_page: number,
  ): Promise<HttpResponseInterface<OffersApiResponse>> {
    try {
      const resp = await this.http.get<OffersApiResponse>(OFFERS_BASE, {
        page,
        per_page,
      });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteOffer(
    offer_id: number,
  ): Promise<HttpResponseInterface<{ success: boolean }>> {
    try {
      const resp = await this.http.delete<{ success: boolean }>(
        `${OFFERS_BASE}/${offer_id}`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
