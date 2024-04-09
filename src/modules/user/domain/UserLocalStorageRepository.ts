import { UserCredentials } from "./User";

export interface UserLocalStorageRepository {
  login: (user: UserCredentials) => void;
  getFromLocalStorage: () => UserCredentials;
  logout: () => void;
}
