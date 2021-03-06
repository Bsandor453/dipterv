// Backend base URLs
const BACKEND_PROTOCOL = 'http';
const BACKEND_HOST = 'localhost';
const BACKEND_PORT = '8080';
const BACKEND_BASE_PATH = 'api/';
const BACKEND_BASE_URL =
  BACKEND_PROTOCOL + '://' + BACKEND_HOST + ':' + BACKEND_PORT + '/' + BACKEND_BASE_PATH;

const INTERCEPTOR_DEBUG = true;

// Backup URL for coin history
const BACKUP_COIN_HISTORY_URL = (id: number, timeframe: string): string =>
  'https://coinranking1.p.rapidapi.com/coin/' +
  id +
  '/history/' +
  timeframe +
  '?x-access-token=i-have-to-migrate-to-v2';

// Testing
const TEST_URL = BACKEND_BASE_URL + 'test/';
const TEST_PUBLIC_URL = TEST_URL + 'all';
const TEST_USER_URL = TEST_URL + 'user';
const TEST_MOD_URL = TEST_URL + 'mod';
const TEST_ADMIN_URL = TEST_URL + 'admin';

// Authentication
const AUTH_URL = BACKEND_BASE_URL + 'auth/';
const SIGN_IN_URL = AUTH_URL + 'signin';
const SIGN_UP_URL = AUTH_URL + 'signup';
const REFRESH_TOKEN_URL = AUTH_URL + 'refreshtoken';

// User
const USER_URL = BACKEND_BASE_URL + 'user/';
const GET_USER_DATA = USER_URL + 'profile';
const UPDATE_USER_DATA = USER_URL + 'profile/update';

// Cryptocurrencies
const CRYPTOCURRENCY_URL = BACKEND_BASE_URL + 'cryptocurrency/';
const CRYPTOCURRENCY_GET_ALL = CRYPTOCURRENCY_URL + 'all';
const CRYPTOCURRENCY_GET_ALL_GLOBAL = (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean
): string =>
  CRYPTOCURRENCY_GET_ALL +
  '/global?page=' +
  page +
  '&size=' +
  size +
  '&sortBy=' +
  sortBy +
  '&asc=' +
  asc;
const CRYPTOCURRENCY_GET_COIN = (id: number): string => CRYPTOCURRENCY_URL + id;
const CRYPTOCURRENCY_GET_HISTORY = (id: number, timeframe: string): string =>
  CRYPTOCURRENCY_GET_COIN(id) + '/history?timeframe=' + timeframe;
const CRYPTOCURRENCY_BUY = CRYPTOCURRENCY_URL + 'buy';
const CRYPTOCURRENCY_SELL = CRYPTOCURRENCY_URL + 'sell';
const CRYPTOCURRENCY_DEPOSIT_MONEY = (amount: number): string =>
  CRYPTOCURRENCY_URL + 'depositmoney?amount=' + amount;
const CRYPTOCURRENCY_RESET_MONEY = CRYPTOCURRENCY_URL + 'resetmoney';
const CRYPTOCURRENCY_GET_WALLET = CRYPTOCURRENCY_URL + 'wallet';
const CRYPTOCURRENCY_GET_TRANSACTIONS = (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean
): string =>
  CRYPTOCURRENCY_URL +
  'transactions?page=' +
  page +
  '&size=' +
  size +
  '&sortBy=' +
  sortBy +
  '&asc=' +
  asc;

const config = {
  defaults: {
    namespace: 'App',
  },
  interceptorDebug: INTERCEPTOR_DEBUG,
  urls: {
    auth: {
      signIn: SIGN_IN_URL,
      signUp: SIGN_UP_URL,
      refreshToken: REFRESH_TOKEN_URL,
    },
    user: {
      getUserData: GET_USER_DATA,
      updateUserData: UPDATE_USER_DATA,
    },
    test: {
      public: TEST_PUBLIC_URL,
      user: TEST_USER_URL,
      mod: TEST_MOD_URL,
      admin: TEST_ADMIN_URL,
    },
    crypto: {
      all: CRYPTOCURRENCY_GET_ALL,
      global: CRYPTOCURRENCY_GET_ALL_GLOBAL,
      coin: CRYPTOCURRENCY_GET_COIN,
      history: CRYPTOCURRENCY_GET_HISTORY,
      historyBackup: BACKUP_COIN_HISTORY_URL,
      buy: CRYPTOCURRENCY_BUY,
      sell: CRYPTOCURRENCY_SELL,
      depositMoney: CRYPTOCURRENCY_DEPOSIT_MONEY,
      resetMoney: CRYPTOCURRENCY_RESET_MONEY,
      wallet: CRYPTOCURRENCY_GET_WALLET,
      transactions: CRYPTOCURRENCY_GET_TRANSACTIONS,
    },
  },
};

export default config;
