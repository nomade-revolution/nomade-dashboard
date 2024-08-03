import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { INFLUENCER_BASE } from "@influencer/application/routes";

export class InfluencerRepository {
  private readonly http: Http = Http.getInstance();

  public async deleteInfluencer(
    user_id: number,
  ): Promise<HttpResponseInterface<{ success: boolean }>> {
    try {
      const resp = await this.http.delete<{ success: boolean }>(
        `${INFLUENCER_BASE}/${user_id}`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
