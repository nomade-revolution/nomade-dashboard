import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { OFFERS_BASE, OFFERS_CATEGORIES } from "../application/routes";
import { FullOffer, OffersApiResponse } from "../domain/Offer";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export class OffersRepository {
  private readonly http: Http = Http.getInstance();

  public async getAllOffers(
    page: number,
    per_page: number,
    params: FilterParams,
  ): Promise<HttpResponseInterface<OffersApiResponse>> {
    try {
      const resp = await this.http.get<OffersApiResponse>(OFFERS_BASE, {
        page,
        per_page,
        ...params,
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

  public async getOfferById(
    offer_id: number,
  ): Promise<HttpResponseInterface<FullOffer>> {
    try {
      const resp = await this.http.get<FullOffer>(`${OFFERS_BASE}/${offer_id}`);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getOfferCategoriesList() {
    try {
      const resp = await this.http.get(`${OFFERS_CATEGORIES}`);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async exportOffers(token: string): Promise<Blob> {
    try {
      const response = await fetch(`${OFFERS_BASE}/export`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.blob();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async createOffer(
    offer: FormData,
  ): Promise<
    HttpResponseInterface<{ data: FullOffer; success: boolean; error: string }>
  > {
    try {
      const resp = await this.http.post<{
        data: FullOffer;
        success: boolean;
        error: string;
      }>(`${OFFERS_BASE}`, offer);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async editOffer(
    offer: FormData,
    offer_id: number,
  ): Promise<
    HttpResponseInterface<{ data: FullOffer; success: boolean; error: string }>
  > {
    try {
      const resp = await this.http.put<{
        data: FullOffer;
        success: boolean;
        error: string;
      }>(`${OFFERS_BASE}/${offer_id}`, offer);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
