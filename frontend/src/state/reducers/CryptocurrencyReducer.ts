import { ActionType } from '../action-types';
import { CryptocurrencyAction } from '../actions';
import ICryptoCoinHistory from '../../interfaces/cryptocurrency/ICryptoCoinHistory';
import ICryptoCurrency from '../../interfaces/cryptocurrency/ICryptoCurrency';
import ICryptoCurrencyDetails from '../../interfaces/cryptocurrency/ICryptoCurrencyDetails';
import IPageable from '../../interfaces/IPageable';
import ITransaction from '../../interfaces/ITransaction';
import IWallet from '../../interfaces/IWallet';

const initialState = {
  all: {
    stats: null,
    base: { symbol: 'USD', sign: '$' },
    coins: null,
  },
  global: {
    stats: null,
    base: { symbol: 'USD', sign: '$' },
    coins: null,
  },
  cryptoCoin: null,
  cryptoHistory: null,
  wallet: null,
  transactions: null,
};

type cryptocurrencyState = {
  all: ICryptoCurrency;
  global: ICryptoCurrency;
  cryptoCoin: ICryptoCurrencyDetails | null;
  cryptoHistory: ICryptoCoinHistory | null;
  wallet: IWallet | null;
  transactions: IPageable<ITransaction> | null;
};

const reducer = (
  state: cryptocurrencyState = initialState,
  action: CryptocurrencyAction
): cryptocurrencyState => {
  switch (action.type) {
    case ActionType.GET_CRYPTOCURRENCIES:
      return { ...state, all: action.payload };
    case ActionType.GET_CRYPTOCURRENCIES_ALL:
      return { ...state, global: action.payload };
    case ActionType.GET_CRYPTOCURRENCY:
      return { ...state, cryptoCoin: action.payload };
    case ActionType.GET_CRYPTOCURRENCY_HISTORY:
      return { ...state, cryptoHistory: action.payload };
    case ActionType.CLEAR_CRYPTOCURRENCIES:
      return initialState;
    case ActionType.DEPOSIT_MONEY:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          referenceCurrency: (state.wallet && state.wallet.referenceCurrency + action.payload) ?? 0,
        },
      };
    case ActionType.RESET_MONEY:
      return { ...state, wallet: { ...state.wallet, referenceCurrency: 0 } };
    case ActionType.GET_WALLET:
      return { ...state, wallet: action.payload };
    case ActionType.GET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
};

export default reducer;
