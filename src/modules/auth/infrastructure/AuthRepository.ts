import { Http } from "@core/application";
import {
  SessionInterface,
  AuthLoginInterface,
  AuthRegisterInterface,
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
} from "@auth/application";
import { AuthUserType } from "@auth/domain/AuthUserType.ts";

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

interface MessageInterface {
  message: string;
}

export class AuthRepository
  implements
    SignInInterface<AuthLoginInterface, SessionInterface>,
    SignOutInterface<null, MessageInterface>,
    SignUpInterface<AuthRegisterInterface, unknown>
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

  // TODO: Promise<HttpResponseInterface<unknown>> el back ha de formatear la respuesta
  public async signUp(
    data: AuthRegisterInterface,
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

  public async getUser(): Promise<HttpResponseInterface<AuthUserType>> {
    try {
      const resp = await this.http.get<AuthUserType>(USER_ROUTE);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
