import { ActionType } from '../action-types';
import { CryptocurrencyAction } from '../actions';
import ICryptocurrency from '../../interfaces/cryptocurrency/ICryptocurrency';
import ICryptocurrencyDetails from '../../interfaces/cryptocurrency/ICryptocurrencyDetails';
import ICryptocurrencyHistory from '../../interfaces/cryptocurrency/ICryptocurrencyHistory';
import IPageable from '../../interfaces/IPageable';
import ISummary from '../../interfaces/ISummary';
import ITransaction from '../../interfaces/ITransaction';
import IWallet from '../../interfaces/IWallet';

const initialState = {
  summary: null,
  coins: null,
  coin: null,
  coinsWallet: null,
  coinsTransactions: null,
  history: null,
  wallet: null,
  transactions: null,
};

type cryptocurrencyState = {
  summary: ISummary | null;
  coins: IPageable<ICryptocurrency> | null;
  coin: ICryptocurrencyDetails | null;
  coinsWallet: ICryptocurrency[] | null;
  coinsTransactions: ICryptocurrency[] | null;
  history: ICryptocurrencyHistory | null;
  wallet: IWallet | null;
  transactions: IPageable<ITransaction> | null;
};

const reducer = (
  state: cryptocurrencyState = initialState,
  action: CryptocurrencyAction
): cryptocurrencyState => {
  switch (action.type) {
    case ActionType.GET_SUMMARY:
      return { ...state, summary: action.payload };
    case ActionType.GET_CRYPTOCURRENCIES:
      return { ...state, coins: action.payload };
    case ActionType.GET_CRYPTOCURRENCY:
      return { ...state, coin: action.payload };
    case ActionType.GET_CRYPTOCURRENCIES_IN_WALLET:
      return { ...state, coinsWallet: action.payload };
    case ActionType.GET_CRYPTOCURRENCIES_IN_TRANSACTIONS:
      return { ...state, coinsTransactions: action.payload };
    case ActionType.GET_CRYPTOCURRENCY_HISTORY:
      return { ...state, history: action.payload };
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
