import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { User, UserApiResponse } from "../domain/User";
import { GET_CONDITIONS, GET_USERS } from "../application/routes";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import { AuthRegisterNomadeInterface } from "@auth";
import { INFLUENCER_EXPORT } from "@company/application/routes";

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
        ...filterParams,
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

  public async getUsersBadge(): Promise<HttpResponseInterface<number>> {
    try {
      const resp = await this.http.get<UserApiResponse>(
        `${GET_USERS}/status/badge`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async registerUser(
    data: AuthRegisterNomadeInterface,
  ): Promise<HttpResponseInterface<User>> {
    try {
      const response = await this.http.post<UserApiResponse>(`${GET_USERS}`, {
        name: data.name,
        email: data.email,
        password: data.password,
        roles: data.roles,
      });

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public exportInfluencersData = async (token: string): Promise<Blob> => {
    try {
      const response = await fetch(INFLUENCER_EXPORT, {
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
  };
  public async getConditions(): Promise<HttpResponseInterface<string>> {
    try {
      const resp = await this.http.get(
        GET_CONDITIONS + "?filters%5Btype%5D=company&filters%5Blast%5D=true",
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
