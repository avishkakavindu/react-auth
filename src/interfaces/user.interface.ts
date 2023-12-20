import { ILoginData } from './auth.inteface';

export interface IRegisterUserData extends ILoginData {
  username: string;
  password: string;
  confirmPassword: string;
}
