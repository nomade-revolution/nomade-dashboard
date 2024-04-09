import { User } from "./User";

export interface UserLocalStorageRepository {
  login: (user: User) => void;
  getFromLocalStorage: () => User;
  logout: () => void;
}
