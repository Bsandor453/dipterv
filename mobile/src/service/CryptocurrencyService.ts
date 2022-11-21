import { AxiosResponse } from 'axios';
import config from '../config/MainConfig';
import ICryptocurrency from '../interfaces/cryptocurrency/ICryptocurrency';
import ICryptocurrencyDetails from '../interfaces/cryptocurrency/ICryptocurrencyDetails';
import ICryptocurrencyHistory from '../interfaces/cryptocurrency/ICryptocurrencyHistory';
import IPageable from '../interfaces/IPageable';
import IWallet from '../interfaces/IWallet';
import { readObject } from '../util/AsyncStorageUtils';
import AxiosWithInterceptors from '../util/AxiosWithInterceptors';

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

const getSummary = async (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean
): Promise<AxiosResponse<any>> => {
  return httpClient.get(
    config.urls.crypto.summary(page, size, sortBy, asc),
    await tokenAuthUrlConfig()
  );
};

const getCryptocurrencies = async (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean,
  search: string
): Promise<AxiosResponse<IPageable<ICryptocurrency>>> => {
  return httpClient.get(
    config.urls.crypto.all(page, size, sortBy, asc, search),
    await tokenAuthUrlConfig()
  );
};

const getCryptocurrency = async (
  id: string
): Promise<AxiosResponse<ICryptocurrencyDetails>> => {
  return httpClient.get(
    config.urls.crypto.coin(id),
    await tokenAuthUrlConfig()
  );
};

const getCryptocurrenciesWithIds = async (
  ids: string[]
): Promise<AxiosResponse<any>> => {
  return httpClient.get(
    config.urls.crypto.coinsWithIds(ids),
    await tokenAuthUrlConfig()
  );
};

const getCryptocurrenciesInWallet = async (): Promise<AxiosResponse<any>> => {
  return httpClient.get(
    config.urls.crypto.coinsInWallet,
    await tokenAuthUrlConfig()
  );
};

const getCryptocurrenciesInTransactions = async (): Promise<
  AxiosResponse<any>
> => {
  return httpClient.get(
    config.urls.crypto.coinsInTransactions,
    await tokenAuthUrlConfig()
  );
};

const getCryptocurrencyHistory = async (
  id: string,
  timeframe: string
): Promise<AxiosResponse<ICryptocurrencyHistory>> => {
  return httpClient.get(
    config.urls.crypto.history(id, timeframe),
    await tokenAuthUrlConfig()
  );
};

const buyCryptocurrency = async (
  id: string,
  amount: number
): Promise<AxiosResponse<String>> => {
  return httpClient.post(
    config.urls.crypto.buy,
    { id, amount },
    await tokenAuthUrlConfig()
  );
};

const sellCryptocurrency = async (
  id: string,
  amount: number
): Promise<AxiosResponse<String>> => {
  return httpClient.post(
    config.urls.crypto.sell,
    { id, amount },
    await tokenAuthUrlConfig()
  );
};

const depositMoney = async (amount: number): Promise<AxiosResponse<any>> => {
  return httpClient.post(
    config.urls.crypto.depositMoney(amount),
    {},
    await tokenAuthUrlConfig()
  );
};

const resetMoney = async (): Promise<AxiosResponse<any>> => {
  return httpClient.post(
    config.urls.crypto.resetMoney,
    {},
    await tokenAuthUrlConfig()
  );
};

const getWallet = async (): Promise<AxiosResponse<IWallet>> => {
  return httpClient.get(config.urls.crypto.wallet, await tokenAuthUrlConfig());
};

const getTransactions = async (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean
): Promise<AxiosResponse<any>> => {
  return httpClient.get(
    config.urls.crypto.transactions(page, size, sortBy, asc),
    await tokenAuthUrlConfig()
  );
};

export default {
  getSummary,
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
