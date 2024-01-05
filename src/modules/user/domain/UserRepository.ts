import { User } from "./User";

export interface UserRepository {
  login: (user: User) => void;
}
