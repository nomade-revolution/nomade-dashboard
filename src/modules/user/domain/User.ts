export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginApiResponse {
  token: string;
  error?: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: string;
  state: string;
}

export interface FullUser extends User {
  avatar?: string;
  password: string;
  c_password: string;
}
