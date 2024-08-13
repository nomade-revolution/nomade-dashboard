import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import {
  CollabsApiResponse,
  FullCollab,
  RejectedCollab,
} from "../domain/Collabs";
import { COLLABS_BASE, COLLABS_REJECTED_REASONS } from "../application/routes";

export class CollabsRepository {
  private readonly http: Http = Http.getInstance();

  public async getAllCollabs(
    page: number,
    per_page: number,
    influencer_id?: number | undefined,
    company_id?: number | undefined,
  ): Promise<HttpResponseInterface<CollabsApiResponse>> {
    try {
      const resp = await this.http.get<CollabsApiResponse>(COLLABS_BASE, {
        page,
        per_page,
        filters: { influencer_id, company_id },
      });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteCollab(
    collab_id: number,
  ): Promise<HttpResponseInterface<{ success: boolean }>> {
    try {
      const resp = await this.http.delete<{ success: boolean }>(
        `${COLLABS_BASE}/${collab_id}`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateCollabHistoryState(
    collab_id: number,
    state_id: number,
    rejected_colab_reason_id?: number,
  ): Promise<HttpResponseInterface<FullCollab>> {
    try {
      const resp = await this.http.put<FullCollab>(
        `${COLLABS_BASE}/${collab_id}/push-history/${state_id}`,
        {
          rejected_colab_reason_id,
        },
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getRejectedCollabReasons(): Promise<
    HttpResponseInterface<RejectedCollab[]>
  > {
    try {
      const resp = await this.http.get<RejectedCollab[]>(
        COLLABS_REJECTED_REASONS,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getCollab(
    collab_id: number,
  ): Promise<HttpResponseInterface<FullCollab>> {
    try {
      const resp = await this.http.get<FullCollab>(
        `${COLLABS_BASE}/${collab_id}`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
