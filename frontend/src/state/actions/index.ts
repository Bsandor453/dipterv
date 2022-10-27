import { ActionType } from '../action-types';
import ICryptocurrency from '../../interfaces/cryptocurrency/ICryptocurrency';
import ICryptocurrencyDetails from '../../interfaces/cryptocurrency/ICryptocurrencyDetails';
import ICryptocurrencyHistory from '../../interfaces/cryptocurrency/ICryptocurrencyHistory';
import IMessage from '../../interfaces/IMessage';
import IPageable from '../../interfaces/IPageable';
import IPropertyUpdate from '../../interfaces/IPropertyUpdate';
import IToken from '../../interfaces/IToken';
import ITransaction from '../../interfaces/ITransaction';
import IUser from '../../interfaces/IUser';
import IWallet from '../../interfaces/IWallet';

interface IDepositAction {
  type: ActionType.DEPOSIT;
  payload: number;
}

interface IWithdrawAction {
  type: ActionType.WITHDRAW;
  payload: number;
}

interface IBankruptAction {
  type: ActionType.BANKRUPT;
}

export type TestAction = IDepositAction | IWithdrawAction | IBankruptAction;

interface ISetRegisterMessageAction {
  type: ActionType.SET_INFO_MESSAGE;
  payload: IMessage;
}

interface ISetLoginMessageAction {
  type: ActionType.SET_LOGIN_MESSAGE;
  payload: IMessage;
}

interface ISetInfoMessageAction {
  type: ActionType.SET_REGISTER_MESSAGE;
  payload: IMessage;
}

export type MessageAction =
  | ISetRegisterMessageAction
  | ISetLoginMessageAction
  | ISetInfoMessageAction;

interface IRegisterAction {
  type: ActionType.REGISTER;
  payload: IUser;
}

interface ILoginAction {
  type: ActionType.LOGIN;
  payload: IToken;
}

interface ILogoutAction {
  type: ActionType.LOGOUT;
}

export type AuthAction = IRegisterAction | ILoginAction | ILogoutAction;

interface IUserDataAction {
  type: ActionType.GET_USER_DATA;
  payload: IUser;
}

interface IClearUserDataAction {
  type: ActionType.CLEAR_USER_DATA;
}

interface IEditUserDataAction {
  type: ActionType.EDIT_USER_DATA;
  payload: IPropertyUpdate;
}

interface ISaveUserDataEditAction {
  type: ActionType.SAVE_USER_DATA_EDIT;
}

export type UserAction =
  | IUserDataAction
  | IClearUserDataAction
  | IEditUserDataAction
  | ISaveUserDataEditAction;

interface IGetCryptocurrenciesAction {
  type: ActionType.GET_CRYPTOCURRENCIES;
  payload: IPageable<ICryptocurrency>;
}

interface IGetCryptocurrencyAction {
  type: ActionType.GET_CRYPTOCURRENCY;
  payload: ICryptocurrencyDetails;
}

interface IGetCryptocurrenciesWithIdsAction {
  type: ActionType.GET_CRYPTOCURRENCIES_WITH_IDS;
  payload: ICryptocurrency[];
}

interface IGetCryptocurrenciesInWallet {
  type: ActionType.GET_CRYPTOCURRENCIES_IN_WALLET;
  payload: ICryptocurrency[];
}

interface IGetCryptocurrenciesInTransactions {
  type: ActionType.GET_CRYPTOCURRENCIES_IN_TRANSACTIONS;
  payload: ICryptocurrency[];
}

interface IGetCryptocurrencyHistoryAction {
  type: ActionType.GET_CRYPTOCURRENCY_HISTORY;
  payload: ICryptocurrencyHistory;
}

interface IClearCryptocurrenciesAction {
  type: ActionType.CLEAR_CRYPTOCURRENCIES;
}

interface IBuyCryptocurrencyAction {
  type: ActionType.BUY_CRYPTOCURRENCY;
}

interface ISellCryptocurrencyAction {
  type: ActionType.SELL_CRYPTOCURRENCY;
}

interface IDepositMoneyAction {
  type: ActionType.DEPOSIT_MONEY;
  payload: number;
}

interface IResetMoneyAction {
  type: ActionType.RESET_MONEY;
}

interface IGetWalletAction {
  type: ActionType.GET_WALLET;
  payload: IWallet;
}

interface IGetTransactionsAction {
  type: ActionType.GET_TRANSACTIONS;
  payload: IPageable<ITransaction>;
}

export type CryptocurrencyAction =
  | IGetCryptocurrenciesAction
  | IGetCryptocurrencyAction
  | IGetCryptocurrenciesWithIdsAction
  | IGetCryptocurrenciesInWallet
  | IGetCryptocurrenciesInTransactions
  | IGetCryptocurrencyHistoryAction
  | IClearCryptocurrenciesAction
  | IBuyCryptocurrencyAction
  | ISellCryptocurrencyAction
  | IDepositMoneyAction
  | IResetMoneyAction
  | IGetWalletAction
  | IGetTransactionsAction;
