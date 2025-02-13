import { Http } from "@core/application";
import {
  SessionInterface,
  AuthLoginInterface,
  AuthRegisterNomadeInterface,
  SignInInterface,
  SignOutInterface,
  SignUpInterface,
} from "@auth/domain";
import { HttpResponseInterface } from "@core/domain";
import {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REGISTER_ROUTE,
  USER_ROUTE,
  RECOVER_PASSWORD_ROUTE,
  CHANGE_PASSWORD_ROUTE,
} from "@auth/application";
import { User } from "modules/user/domain/User";

interface SignUpResponseInterface {
  user: {
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: string;
  };
  message: string;
}

export interface UserResponseInterface {
  data: User;
  message: string;
  success: boolean;
}
interface MessageInterface {
  message: string;
}

export class AuthRepository
  implements
    SignInInterface<AuthLoginInterface, SessionInterface>,
    SignOutInterface<null, MessageInterface>,
    SignUpInterface<AuthRegisterNomadeInterface, unknown>
{
  private readonly http: Http = Http.getInstance();

  public async signIn(
    data: AuthLoginInterface,
  ): Promise<HttpResponseInterface<SessionInterface>> {
    try {
      const resp = await this.http.post<SessionInterface>(LOGIN_ROUTE, data);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async signOut(): Promise<HttpResponseInterface<MessageInterface>> {
    try {
      const resp = await this.http.post<MessageInterface>(LOGOUT_ROUTE);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async signUp(
    data: AuthRegisterNomadeInterface,
  ): Promise<HttpResponseInterface<SignUpResponseInterface>> {
    try {
      const resp = await this.http.post<SignUpResponseInterface>(
        REGISTER_ROUTE,
        data,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public async recoverPassword(email: string): Promise<boolean> {
    try {
      const resp = await this.http.post<MessageInterface>(
        RECOVER_PASSWORD_ROUTE,
        { email },
      );
      return resp.success;
    } catch (error) {
      return false;
    }
  }
  public async getLoggedUser(): Promise<
    HttpResponseInterface<UserResponseInterface>
  > {
    try {
      const resp = await this.http.get<UserResponseInterface>(USER_ROUTE);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async changePassword(
    password: string,
    newPassword: string,
  ): Promise<boolean> {
    try {
      const resp = await this.http.post<MessageInterface>(
        CHANGE_PASSWORD_ROUTE,
        {
          current_password: password,
          new_password: newPassword,
          new_password_confirmation: newPassword,
        },
      );
      return resp.success;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
