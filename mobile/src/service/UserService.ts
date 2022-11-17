import { AxiosResponse } from 'axios';
import IUser from '../interfaces/IUser';
import AxiosWithInterceptors from '../util/AxiosWithInterceptors';
import config from '../config/MainConfig';
import { readObject } from '../util/AsyncStorageUtils';

const httpClient = AxiosWithInterceptors();

const tokenAuthUrlConfig = async () => {
  const authHeader = await readObject('user');
  return { headers: { 'Content-Type': 'application/json', ...authHeader() } };
};

const getUserData = async (): Promise<AxiosResponse<any>> => {
  return httpClient.get(
    config.urls.user.getUserData,
    await tokenAuthUrlConfig()
  );
};

const updateUserData = async (userData: IUser): Promise<AxiosResponse<any>> => {
  return httpClient.post(
    config.urls.user.updateUserData,
    userData,
    await tokenAuthUrlConfig()
  );
};

export default {
  getUserData,
  updateUserData,
};
