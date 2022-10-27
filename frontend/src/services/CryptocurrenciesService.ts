import { AxiosResponse } from 'axios';
import authHeader from './AuthHeader';
import config from '../config/Config';
import useAxios from './util/useAxios';

const httpClient = useAxios();

const tokenAuthUrlConfig = () => {
  return { headers: { 'Content-Type': 'application/json', ...authHeader() } };
};

const getCryptocurrencies = (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean,
  search: string
): Promise<AxiosResponse<any>> => {
  return httpClient.get(
    config.urls.crypto.all(page, size, sortBy, asc, search),
    tokenAuthUrlConfig()
  );
};

const getCryptocurrency = (id: string): Promise<AxiosResponse<any>> => {
  return httpClient.get(config.urls.crypto.coin(id), tokenAuthUrlConfig());
};

const getCryptocurrenciesWithIds = (ids: string[]): Promise<AxiosResponse<any>> => {
  return httpClient.get(config.urls.crypto.coinsWithIds(ids), tokenAuthUrlConfig());
};

const getCryptocurrenciesInWallet = (): Promise<AxiosResponse<any>> => {
  return httpClient.get(config.urls.crypto.coinsInWallet, tokenAuthUrlConfig());
};

const getCryptocurrenciesInTransactions = (): Promise<AxiosResponse<any>> => {
  return httpClient.get(config.urls.crypto.coinsInTransactions, tokenAuthUrlConfig());
};

const getCryptocurrencyHistory = (id: string, timeframe: string): Promise<AxiosResponse<any>> => {
  return httpClient.get(config.urls.crypto.history(id, timeframe), tokenAuthUrlConfig());
};

const buyCryptocurrency = (
  id: string,
  amount: number,
  price: number
): Promise<AxiosResponse<any>> => {
  return httpClient.post(config.urls.crypto.buy, { id, amount, price }, tokenAuthUrlConfig());
};

const sellCryptocurrency = (
  id: string,
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
  getCryptocurrenciesWithIds,
  getCryptocurrenciesInWallet,
  getCryptocurrenciesInTransactions,
  getCryptocurrencyHistory,
  buyCryptocurrency,
  sellCryptocurrency,
  depositMoney,
  resetMoney,
  getWallet,
  getTransactions,
};
