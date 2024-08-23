/* eslint-disable @typescript-eslint/no-explicit-any */
import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { CATEGORIES } from "../application/routes";
import { Category } from "../domain";

export class CategoriesRepository {
  private readonly http: Http = Http.getInstance();

  public async getCategories(): Promise<HttpResponseInterface<Category[]>> {
    try {
      const resp = await this.http.get<any>(CATEGORIES);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
