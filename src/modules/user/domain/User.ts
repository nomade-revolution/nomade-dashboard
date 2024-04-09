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
  email: string;
  phone: string;
  role: string;
  state: string;
}
