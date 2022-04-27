import { AxiosResponse } from 'axios';
import IUser from '../interfaces/IUser';
import authHeader from './AuthHeader';
import config from '../config/Config';
import useAxios from './useAxios';

const httpClient = useAxios();

const tokenAuthUrlConfig = () => {
  return { headers: { 'Content-Type': 'application/json', ...authHeader() } };
};

const getUserData = (): Promise<AxiosResponse<any>> => {
  return httpClient.get(config.urls.user.getUserData, tokenAuthUrlConfig());
};

const updateUserData = (userData: IUser): Promise<AxiosResponse<any>> => {
  return httpClient.post(config.urls.user.updateUserData, userData, tokenAuthUrlConfig());
};

export default {
  getUserData,
  updateUserData,
};
