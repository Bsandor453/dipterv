import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICryptocurrency from '../../interfaces/cryptocurrency/ICryptocurrency';
import ICryptocurrencyDetails from '../../interfaces/cryptocurrency/ICryptocurrencyDetails';
import ICryptocurrencyHistory from '../../interfaces/cryptocurrency/ICryptocurrencyHistory';
import IPageable from '../../interfaces/IPageable';
import ISummary from '../../interfaces/ISummary';
import ITransaction from '../../interfaces/ITransaction';
import IWallet from '../../interfaces/IWallet';
import {
  buyCryptocurrency,
  depositMoney,
  getCryptocurrencies,
  getCryptocurrenciesInTransactions,
  getCryptocurrenciesInWallet,
  getCryptocurrency,
  getCryptocurrencyHistory,
  getTransactionHistory,
  getWallet,
  resetMoney,
  sellCryptocurrency,
} from '../action_creators/cryptocurrency';

export interface CryptocurrencyState {
  summary?: ISummary | null;
  coins: IPageable<ICryptocurrency> | null;
  coin: ICryptocurrencyDetails | null;
  coinsWallet: ICryptocurrency[] | null;
  coinsTransactions: ICryptocurrency[] | null;
  history: ICryptocurrencyHistory | null;
  wallet: IWallet | null;
  transactions: IPageable<ITransaction> | null;
  _status: {
    summary: string;
    coins: string;
    coin: string;
    coinsWallet: string;
    coinsTransactions: string;
    history: string;
    wallet: string;
    moneyDeposit: string;
    moneyReset: string;
    transactions: string;
    buy: string;
    sell: string;
  };
}

const initialState: CryptocurrencyState = {
  summary: null,
  coins: null,
  coin: null,
  coinsWallet: null,
  coinsTransactions: null,
  history: null,
  wallet: null,
  transactions: null,
  _status: {
    summary: 'init',
    coins: 'init',
    coin: 'init',
    coinsWallet: 'init',
    coinsTransactions: 'init',
    history: 'init',
    wallet: 'init',
    moneyDeposit: 'init',
    moneyReset: 'init',
    transactions: 'init',
    buy: 'init',
    sell: 'init',
  },
};

export const cryptocurrencySlice = createSlice({
  name: 'cryptocurrency',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCryptocurrencies.pending, (state) => {
        state._status.coins = 'pending';
      })
      .addCase(
        getCryptocurrencies.fulfilled,
        (state, action: PayloadAction<IPageable<ICryptocurrency>>) => {
          state._status.coins = 'success';
          state.coins = action.payload;
        }
      )
      .addCase(getCryptocurrencies.rejected, (state, action) => {
        state._status.coins = action.error?.message ?? 'error';
      })
      .addCase(getCryptocurrencyHistory.pending, (state) => {
        state._status.history = 'pending';
      })
      .addCase(
        getCryptocurrencyHistory.fulfilled,
        (state, action: PayloadAction<ICryptocurrencyHistory>) => {
          state._status.history = 'success';
          state.history = action.payload;
        }
      )
      .addCase(getCryptocurrencyHistory.rejected, (state, action) => {
        state._status.history = action.error?.message ?? 'error';
      })
      .addCase(getCryptocurrency.pending, (state) => {
        state._status.coin = 'pending';
      })
      .addCase(
        getCryptocurrency.fulfilled,
        (state, action: PayloadAction<ICryptocurrencyDetails>) => {
          state._status.coin = 'success';
          state.coin = action.payload;
        }
      )
      .addCase(getCryptocurrency.rejected, (state, action) => {
        state._status.coin = action.error?.message ?? 'error';
      })
      .addCase(getWallet.pending, (state) => {
        state._status.wallet = 'pending';
      })
      .addCase(getWallet.fulfilled, (state, action: PayloadAction<IWallet>) => {
        state._status.wallet = 'success';
        state.wallet = action.payload;
      })
      .addCase(getWallet.rejected, (state, action) => {
        state._status.wallet = action.error?.message ?? 'error';
      })
      .addCase(buyCryptocurrency.pending, (state) => {
        state._status.buy = 'pending';
      })
      .addCase(
        buyCryptocurrency.fulfilled,
        (state, action: PayloadAction<String>) => {
          state._status.buy = `success (${action.payload})`;
        }
      )
      .addCase(buyCryptocurrency.rejected, (state, action) => {
        state._status.buy = action.error?.message ?? 'error';
      })
      .addCase(sellCryptocurrency.pending, (state) => {
        state._status.sell = 'pending';
      })
      .addCase(
        sellCryptocurrency.fulfilled,
        (state, action: PayloadAction<String>) => {
          state._status.sell = `success (${action.payload})`;
        }
      )
      .addCase(sellCryptocurrency.rejected, (state, action) => {
        state._status.sell = action.error?.message ?? 'error';
      })
      .addCase(getCryptocurrenciesInWallet.pending, (state) => {
        state._status.coinsWallet = 'pending';
      })
      .addCase(
        getCryptocurrenciesInWallet.fulfilled,
        (state, action: PayloadAction<ICryptocurrency[]>) => {
          state._status.coinsWallet = 'success';
          state.coinsWallet = action.payload;
        }
      )
      .addCase(getCryptocurrenciesInWallet.rejected, (state, action) => {
        state._status.coinsWallet = action.error?.message ?? 'error';
      })
      .addCase(depositMoney.pending, (state) => {
        state._status.moneyDeposit = 'pending';
      })
      .addCase(
        depositMoney.fulfilled,
        (state, action: PayloadAction<string>) => {
          state._status.moneyDeposit = `success (${action.payload})`;
        }
      )
      .addCase(depositMoney.rejected, (state, action) => {
        state._status.moneyDeposit = action.error?.message ?? 'error';
      })
      .addCase(resetMoney.pending, (state) => {
        state._status.moneyReset = 'pending';
      })
      .addCase(resetMoney.fulfilled, (state, action: PayloadAction<string>) => {
        state._status.moneyReset = `success (${action.payload})`;
      })
      .addCase(resetMoney.rejected, (state, action) => {
        state._status.moneyReset = action.error?.message ?? 'error';
      })
      .addCase(getTransactionHistory.pending, (state) => {
        state._status.transactions = 'pending';
      })
      .addCase(
        getTransactionHistory.fulfilled,
        (state, action: PayloadAction<IPageable<ITransaction>>) => {
          state.transactions = action.payload;
          state._status.transactions = 'success';
        }
      )
      .addCase(getTransactionHistory.rejected, (state, action) => {
        state._status.transactions = action.error?.message ?? 'error';
      })
      .addCase(getCryptocurrenciesInTransactions.pending, (state) => {
        state._status.coinsTransactions = 'pending';
      })
      .addCase(
        getCryptocurrenciesInTransactions.fulfilled,
        (state, action: PayloadAction<ICryptocurrency[]>) => {
          state.coinsTransactions = action.payload;
          state._status.coinsTransactions = 'success';
        }
      )
      .addCase(getCryptocurrenciesInTransactions.rejected, (state, action) => {
        state._status.coinsTransactions = action.error?.message ?? 'error';
      });
  },
});

export default cryptocurrencySlice.reducer;
