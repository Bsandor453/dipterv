// Backend base URLs
const BACKEND_PROTOCOL = 'http';
const BACKEND_HOST = 'localhost';
const BACKEND_PORT = '8080';
const BACKEND_BASE_PATH = '/api';
const BACKEND_BASE_URL =
  BACKEND_PROTOCOL + '://' + BACKEND_HOST + ':' + BACKEND_PORT + BACKEND_BASE_PATH;

// Proxy URL
const PROXY =
  'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';

// Testing
const TEST_URL = BACKEND_BASE_URL + '/test';
const TEST_PUBLIC_URL = TEST_URL + '/all';
const TEST_USER_URL = TEST_URL + '/user';
const TEST_MOD_URL = TEST_URL + '/mod';
const TEST_ADMIN_URL = TEST_URL + '/admin';

// Authentication
const AUTH_URL = BACKEND_BASE_URL + '/auth';
const SIGN_IN_URL = AUTH_URL + '/signin';
const SIGN_UP_URL = AUTH_URL + '/signup';
const REFRESH_TOKEN_URL = AUTH_URL + '/refreshtoken';

// User
const USER_URL = BACKEND_BASE_URL + '/user';
const GET_USER_DATA = USER_URL + '/profile';
const UPDATE_USER_DATA = USER_URL + '/profile/update';

// Cryptocurrencies
const CRYPTOCURRENCY_URL = BACKEND_BASE_URL + '/cryptocurrency';
const CRYPTOCURRENCY_GET_ALL = (page: number, size: number, sortBy: string, asc: boolean): string =>
  CRYPTOCURRENCY_URL + '/all?page=' + page + '&size=' + size + '&sortBy=' + sortBy + '&asc=' + asc;
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
    baseCurrency: {
      name: 'United States dollar',
      symbol: '$',
      code: 'USD',
    },
    currencyCount: 1000,
  },
  interceptorDebug: true,
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
      coin: CRYPTOCURRENCY_GET_COIN,
      history: CRYPTOCURRENCY_GET_HISTORY,
      buy: CRYPTOCURRENCY_BUY,
      sell: CRYPTOCURRENCY_SELL,
      depositMoney: CRYPTOCURRENCY_DEPOSIT_MONEY,
      resetMoney: CRYPTOCURRENCY_RESET_MONEY,
      wallet: CRYPTOCURRENCY_GET_WALLET,
      transactions: CRYPTOCURRENCY_GET_TRANSACTIONS,
    },
    proxy: PROXY,
  },
};

export default config;
