import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICryptocurrency from '../../interfaces/cryptocurrency/ICryptocurrency';
import ICryptocurrencyDetails from '../../interfaces/cryptocurrency/ICryptocurrencyDetails';
import ICryptocurrencyHistory from '../../interfaces/cryptocurrency/ICryptocurrencyHistory';
import IPageable from '../../interfaces/IPageable';
import ISummary from '../../interfaces/ISummary';
import ITransaction from '../../interfaces/ITransaction';
import IWallet from '../../interfaces/IWallet';
import {
  getCryptocurrencies,
  getCryptocurrency,
  getCryptocurrencyHistory,
  getWallet,
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
    transactions: string;
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
    transactions: 'init',
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
      });
  },
});

export default cryptocurrencySlice.reducer;
