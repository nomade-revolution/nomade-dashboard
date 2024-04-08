export interface User {
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginApiResponse {
  token: string;
  error?: string;
}
