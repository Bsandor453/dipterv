// Backend base URLs
const BACKEND_PROTOCOL = 'http';
const BACKEND_HOST = '192.168.0.17';
const BACKEND_PORT = '8080';
const BACKEND_BASE_PATH = '/api';
const BACKEND_BASE_URL =
  BACKEND_PROTOCOL +
  '://' +
  BACKEND_HOST +
  ':' +
  BACKEND_PORT +
  BACKEND_BASE_PATH;

// Proxy URL
const PROXY =
  'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';

// Testing URLs
const TEST = BACKEND_BASE_URL + '/test';
const TEST_PUBLIC = TEST + '/all';
const TEST_USER = TEST + '/user';
const TEST_MOD = TEST + '/mod';
const TEST_ADMIN = TEST + '/admin';

// Authentication URLs
const AUTH = BACKEND_BASE_URL + '/auth';
const SIGN_IN = AUTH + '/signin';
const SIGN_UP = AUTH + '/signup';
const REFRESH_TOKEN = AUTH + '/refreshtoken';

// User URLs
const USER = BACKEND_BASE_URL + '/user';
const GET_USER_DATA = USER + '/profile';
const UPDATE_USER_DATA = USER + '/profile/update';

// Cryptocurrency URLs
const CRYPTOCURRENCY = BACKEND_BASE_URL + '/cryptocurrency';
const GET_ALL = (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean,
  search: string
): string =>
  `${CRYPTOCURRENCY}/all?page=${page}&size=${size}&sortBy=${sortBy}&asc=${asc}&search=${search}`;
const GET_SUMMARY = (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean
): string =>
  `${CRYPTOCURRENCY}/summary?page=${page}&size=${size}&sortBy=${sortBy}&asc=${asc}`;
const GET_COIN = (id: string): string => `${CRYPTOCURRENCY}/${id}`;
const GET_COINS_WITH_IDS = (ids: string[]): string =>
  `${CRYPTOCURRENCY}/ids/${ids.join(', ')}`;
const GET_COINS_IN_WALLET = `${CRYPTOCURRENCY}/wallet/coins`;
const GET_COINS_IN_TRANSACTIONS = `${CRYPTOCURRENCY}/transactions/coins`;
const GET_HISTORY = (id: string, timeframe: string): string =>
  `${GET_COIN(id)}/history?timeframe=${timeframe}`;
const BUY = `${CRYPTOCURRENCY}/buy`;
const SELL = `${CRYPTOCURRENCY}/sell`;
const DEPOSIT_MONEY = (amount: number): string =>
  `${CRYPTOCURRENCY}/depositmoney?amount=${amount}`;
const RESET_MONEY = `${CRYPTOCURRENCY}/resetmoney`;
const GET_WALLET = `${CRYPTOCURRENCY}/wallet`;
const GET_TRANSACTIONS = (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean
): string =>
  `${CRYPTOCURRENCY}/transactions?page=${page}&size=${size}&sortBy=${sortBy}&asc=${asc}`;

const config = {
  defaults: {
    namespace: 'App',
    baseCurrency: {
      name: 'United States dollar',
      symbol: '$',
      code: 'USD',
    },
    locale: 'en-GB',
    localeShort: 'en',
    fallbackNumberPrecision: 7,
    dateFormat: 'DD MMMM, YYYY',
    axiosTimeout: 5000,
    snackbarDuration: 10000,
  },
  interceptorDebug: true,
  urls: {
    auth: {
      signIn: SIGN_IN,
      signUp: SIGN_UP,
      refreshToken: REFRESH_TOKEN,
    },
    user: {
      getUserData: GET_USER_DATA,
      updateUserData: UPDATE_USER_DATA,
    },
    test: {
      public: TEST_PUBLIC,
      user: TEST_USER,
      mod: TEST_MOD,
      admin: TEST_ADMIN,
    },
    crypto: {
      summary: GET_SUMMARY,
      all: GET_ALL,
      coin: GET_COIN,
      coinsWithIds: GET_COINS_WITH_IDS,
      coinsInWallet: GET_COINS_IN_WALLET,
      coinsInTransactions: GET_COINS_IN_TRANSACTIONS,
      history: GET_HISTORY,
      buy: BUY,
      sell: SELL,
      depositMoney: DEPOSIT_MONEY,
      resetMoney: RESET_MONEY,
      wallet: GET_WALLET,
      transactions: GET_TRANSACTIONS,
    },
    proxy: PROXY,
  },
};

export default config;
