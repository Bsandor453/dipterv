import { ActionType } from '../action-types';
import { CryptocurrencyAction } from '../actions';
import ICryptoCurrencyDetails from '../../interfaces/cryptocurrency/ICryptocurrencyDetails';
import ICryptoCurrencyHistory from '../../interfaces/cryptocurrency/ICryptocurrencyHistory';
import ICryptocurrency from '../../interfaces/cryptocurrency/ICryptocurrency';
import IPageable from '../../interfaces/IPageable';
import ITransaction from '../../interfaces/ITransaction';
import IWallet from '../../interfaces/IWallet';

const initialState = {
  coins: null,
  coin: null,
  history: null,
  wallet: null,
  transactions: null,
};

type cryptocurrencyState = {
  coins: IPageable<ICryptocurrency> | null;
  coin: ICryptoCurrencyDetails | null;
  history: ICryptoCurrencyHistory | null;
  wallet: IWallet | null;
  transactions: IPageable<ITransaction> | null;
};

const reducer = (
  state: cryptocurrencyState = initialState,
  action: CryptocurrencyAction
): cryptocurrencyState => {
  switch (action.type) {
    case ActionType.GET_CRYPTOCURRENCIES:
      return { ...state, coins: action.payload };
    case ActionType.GET_CRYPTOCURRENCY:
      return { ...state, coin: action.payload };
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
