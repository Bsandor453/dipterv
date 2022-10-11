import { AxiosResponse } from 'axios';
import authHeader from './AuthHeader';
import config from '../config/Config';
import rapidApiAuthHeader from './RapidApiAuthHeader';
import useAxios from './useAxios';

const httpClient = useAxios();

const tokenAuthUrlConfig = () => {
  return { headers: { 'Content-Type': 'application/json', ...authHeader() } };
};

const rapidApiUrlConfig = () => {
  return { headers: { 'Content-Type': 'application/json', ...rapidApiAuthHeader() } };
};

const getCryptocurrencies = (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean
): Promise<AxiosResponse<any>> => {
  return httpClient.get(config.urls.crypto.all(page, size, sortBy, asc), tokenAuthUrlConfig());
};

const getCryptocurrency = (id: number): Promise<AxiosResponse<any>> => {
  return httpClient.get(config.urls.crypto.coin(id), tokenAuthUrlConfig());
};

const getCryptocurrencyHistory = (id: number, timeframe: string): Promise<AxiosResponse<any>> => {
  return httpClient.get(config.urls.crypto.history(id, timeframe), tokenAuthUrlConfig());
};

const buyCryptocurrency = (
  id: number,
  amount: number,
  price: number
): Promise<AxiosResponse<any>> => {
  return httpClient.post(config.urls.crypto.buy, { id, amount, price }, tokenAuthUrlConfig());
};

const sellCryptocurrency = (
  id: number,
  amount: number,
  price: number
): Promise<AxiosResponse<any>> => {
  return httpClient.post(config.urls.crypto.sell, { id, amount, price }, tokenAuthUrlConfig());
};

const depositMoney = (amount: number): Promise<AxiosResponse<any>> => {
  return httpClient.post(config.urls.crypto.depositMoney(amount), {}, tokenAuthUrlConfig());
};

const resetMoney = (): Promise<AxiosResponse<any>> => {
  return httpClient.post(config.urls.crypto.resetMoney, {}, tokenAuthUrlConfig());
};

const getWallet = (): Promise<AxiosResponse<any>> => {
  return httpClient.get(config.urls.crypto.wallet, tokenAuthUrlConfig());
};

const getTransactions = (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean
): Promise<AxiosResponse<any>> => {
  return httpClient.get(
    config.urls.crypto.transactions(page, size, sortBy, asc),
    tokenAuthUrlConfig()
  );
};

export default {
  getCryptocurrencies,
  getCryptocurrency,
  getCryptocurrencyHistory,
  buyCryptocurrency,
  sellCryptocurrency,
  depositMoney,
  resetMoney,
  getWallet,
  getTransactions,
};
