import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { INFLUENCER_BASE } from "@influencer/application/routes";
import { Influencer } from "@influencer/domain";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export class InfluencerRepository {
  private readonly http: Http = Http.getInstance();

  public async deleteInfluencer(
    influencer_id: number,
  ): Promise<HttpResponseInterface<{ success: boolean }>> {
    try {
      const resp = await this.http.delete<{ success: boolean }>(
        `${INFLUENCER_BASE}/${influencer_id}`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getInfluencerById(
    influencer_id: number,
  ): Promise<HttpResponseInterface<Influencer>> {
    try {
      const resp = await this.http.get<Influencer>(
        `${INFLUENCER_BASE}/${influencer_id}`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getInfluencersBadge(): Promise<HttpResponseInterface<number>> {
    try {
      const resp = await this.http.get<number>(
        `${INFLUENCER_BASE}/status/badge`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getInfluencers(
    params: FilterParams,
  ): Promise<HttpResponseInterface<Influencer[]>> {
    try {
      const resp = await this.http.get<Influencer[]>(INFLUENCER_BASE, params);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
