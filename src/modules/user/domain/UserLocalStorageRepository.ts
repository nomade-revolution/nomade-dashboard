import { UserLogin } from "./User";

export interface UserLocalStorageRepository {
  login: (user: UserLogin) => void;
  getFromLocalStorage: () => UserLogin;
  logout: () => void;
}
