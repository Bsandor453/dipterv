import { AxiosResponse } from 'axios';
import config from '../config/MainConfig';
import IToken from '../interfaces/IToken';
import IUser from '../interfaces/IUser';
import AxiosWithInterceptors from '../util/AxiosWithInterceptors';

const httpClient = AxiosWithInterceptors();

const register = (user: IUser): Promise<AxiosResponse<any>> => {
  return httpClient.post(config.urls.auth.signUp, user, {
    timeout: config.defaults.axiosTimeout,
  });
};

const login = (
  username: string,
  password: string
): Promise<AxiosResponse<IToken>> => {
  return httpClient.post(
    config.urls.auth.signIn,
    {
      username,
      password,
    },
    { timeout: config.defaults.axiosTimeout }
  );
};

export default {
  register,
  login,
};
