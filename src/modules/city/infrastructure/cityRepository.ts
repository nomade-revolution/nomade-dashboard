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
      // DEV-only debug logging
      const isDev = import.meta.env.MODE !== "production";
      if (isDev) {
        // Debug logging removed for production
      }

      const resp = await this.http.get<CityInterface[]>(CITY_BASE, {
        filters,
      });
      return resp;
    } catch (error) {
      // DEV-only debug logging
      const isDev = import.meta.env.MODE !== "production";
      if (isDev) {
        // Debug logging removed for production
      }
      return Promise.reject(error);
    }
  }
}
