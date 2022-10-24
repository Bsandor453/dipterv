import { AxiosResponse } from 'axios';
import authHeader from './AuthHeader';
import config from '../config/Config';
import useAxios from './util/useAxios';

const httpClient = useAxios();

const tokenAuthUrlConfig = () => {
  return { headers: { 'Content-Type': 'application/json', ...authHeader() } };
};

const getPublicContent = (): Promise<AxiosResponse<string>> => {
  return httpClient.get(config.urls.test.public);
};

const getUserBoard = (): Promise<AxiosResponse<string>> => {
  return httpClient.get(config.urls.test.user, tokenAuthUrlConfig());
};

const getModeratorBoard = (): Promise<AxiosResponse<string>> => {
  return httpClient.get(config.urls.test.mod, tokenAuthUrlConfig());
};

const getAdminBoard = (): Promise<AxiosResponse<string>> => {
  return httpClient.get(config.urls.test.admin, tokenAuthUrlConfig());
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
