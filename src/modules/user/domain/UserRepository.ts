import { UserLogin, UserLoginApiResponse } from "./User";

export interface UserRepository {
  login: (user: UserLogin) => Promise<{
    data?: UserLoginApiResponse;
    success?: boolean;
    error?: string;
  }>;
}
