export interface AuthLoginInterface {
  email: string;
  password: string;
}

export interface AuthRecoverPasswordInterface {
  email: string;
}
export interface AuthRegisterNomadeInterface {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  roles: number[];
}
