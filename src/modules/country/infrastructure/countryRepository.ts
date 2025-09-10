import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { COUNTRY_BASE } from "@country/application/routes";
import { CountryInterface } from "@country/domain";

export class CountryRepository {
  private readonly http: Http = Http.getInstance();

  public async getCountries(): Promise<
    HttpResponseInterface<CountryInterface[]>
  > {
    try {
      // DEV-only debug logging
      const isDev = import.meta.env.MODE !== "production";
      if (isDev) {
        // Debug logging removed for production
      }

      const resp = await this.http.get<CountryInterface[]>(COUNTRY_BASE);
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
