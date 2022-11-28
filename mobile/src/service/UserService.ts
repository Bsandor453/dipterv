import { AxiosResponse } from 'axios';
import IUser from '../interfaces/IUser';
import AxiosWithInterceptors from '../util/AxiosWithInterceptors';
import config from '../config/MainConfig';
import { readObject } from '../util/AsyncStorageUtils';

const httpClient = AxiosWithInterceptors();

const tokenAuthUrlConfig = async () => {
  const userJWT = await readObject('userJWT');
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userJWT.accessToken,
    },
  };
};

const getUserData = async (): Promise<AxiosResponse<IUser>> => {
  return httpClient.get(
    config.urls.user.getUserData,
    await tokenAuthUrlConfig()
  );
};

const updateUserData = async (
  userData: IUser
): Promise<AxiosResponse<String>> => {
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
