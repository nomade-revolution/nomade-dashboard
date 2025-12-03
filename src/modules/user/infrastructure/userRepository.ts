import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { User, UserApiResponse, UserRol } from "../domain/User";
import { GET_USER_ROLES, GET_USERS } from "../application/routes";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import { AuthRegisterNomadeInterface } from "@auth";
import { COMPANY_BASE, INFLUENCER_EXPORT } from "@company/application/routes";

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

  public async getUserData(
    user_id: number,
  ): Promise<HttpResponseInterface<User>> {
    try {
      const resp = await this.http.get<User>(`${GET_USERS}/${user_id}`);
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

  public async modifyUser(
    user_id: number,
    data: User,
  ): Promise<HttpResponseInterface<{ success: boolean }>> {
    try {
      const resp = await this.http.put<UserApiResponse>(
        `${GET_USERS}/${user_id}`,
        data,
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
      const requestBody: {
        name: string;
        email: string;
        password: string;
        roles: number[];
        is_nomade_staff?: boolean;
      } = {
        name: data.name,
        email: data.email,
        password: data.password,
        roles: data.roles,
      };

      // Include is_nomade_staff if it's explicitly set
      if (data.is_nomade_staff !== undefined) {
        requestBody.is_nomade_staff = data.is_nomade_staff;
      }

      const response = await this.http.post<UserApiResponse>(
        `${GET_USERS}`,
        requestBody,
      );

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
  public async getConditions(
    companyId: number,
  ): Promise<HttpResponseInterface<string>> {
    try {
      const resp = await this.http.get(
        `${COMPANY_BASE}/${companyId}/status/terms-conditions`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getRolesList(): Promise<HttpResponseInterface<UserRol[]>> {
    try {
      const resp = await this.http.get<UserRol[]>(`${GET_USER_ROLES}`);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
