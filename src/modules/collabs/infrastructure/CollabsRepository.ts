import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { CollabsApiResponse } from "../domain/Collabs";
import { GET_COLLABS } from "../application/routes";

export class CollabsRepository {
  private readonly http: Http = Http.getInstance();

  public async getAllCollabs(
    page: number,
    per_page: number,
  ): Promise<HttpResponseInterface<CollabsApiResponse>> {
    try {
      const resp = await this.http.get<CollabsApiResponse>(GET_COLLABS, {
        page,
        per_page,
      });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
