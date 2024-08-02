import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { UserApiResponse } from "../domain/User";
import { GET_USERS } from "../application/routes";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export class UsersRepository {
  private readonly http: Http = Http.getInstance();

  public async getUsers(
    page: number,
    per_page: number,
    filterParams: FilterParams,
  ): Promise<HttpResponseInterface<UserApiResponse>> {
    try {
      const resp = await this.http.get<UserApiResponse>(GET_USERS, {
        page,
        per_page,
        filters: { ...filterParams },
      });
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteUser(
    user_id: number,
  ): Promise<HttpResponseInterface<{ success: boolean }>> {
    try {
      const resp = await this.http.delete<UserApiResponse>(
        `${GET_USERS}/${user_id}`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
