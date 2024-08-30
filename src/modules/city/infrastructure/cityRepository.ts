import { CITY_BASE } from "@city/application/routes";
import { CityInterface } from "@city/domain";
import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export class CityRepository {
  private readonly http: Http = Http.getInstance();

  public async getCities(
    filters: FilterParams,
  ): Promise<HttpResponseInterface<CityInterface[]>> {
    try {
      const resp = await this.http.get<CityInterface[]>(CITY_BASE, {
        filters,
      });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
