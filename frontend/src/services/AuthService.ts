import { AxiosResponse } from 'axios';
import IUser from '../interfaces/IUser';
import config from '../config/Config';
import useAxios from './util/useAxios';

const httpClient = useAxios();

const register = (user: IUser): Promise<AxiosResponse<any>> => {
  return httpClient.post(config.urls.auth.signUp, user);
};

const login = (username: string, password: string): Promise<AxiosResponse<any>> => {
  return httpClient.post(config.urls.auth.signIn, {
    username,
    password,
  });
};

const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('token_expires_at');
  localStorage.removeItem('token_valid_since');
};

export default {
  register,
  login,
  logout,
};
