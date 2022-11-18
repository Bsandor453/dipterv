import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICryptocurrency from '../../interfaces/cryptocurrency/ICryptocurrency';
import ICryptocurrencyDetails from '../../interfaces/cryptocurrency/ICryptocurrencyDetails';
import ICryptocurrencyHistory from '../../interfaces/cryptocurrency/ICryptocurrencyHistory';
import IPageable from '../../interfaces/IPageable';
import ISummary from '../../interfaces/ISummary';
import ITransaction from '../../interfaces/ITransaction';
import IWallet from '../../interfaces/IWallet';
import getCryptocurrencies from '../action_creators/cryptocurrency';

export interface CryptocurrencyState {
  summary?: ISummary | null | string | undefined;
  coins: IPageable<ICryptocurrency> | null | string | undefined;
  coin: ICryptocurrencyDetails | null | string | undefined;
  coinsWallet: ICryptocurrency[] | null | string | undefined;
  coinsTransactions: ICryptocurrency[] | null | string | undefined;
  history: ICryptocurrencyHistory | null | string | undefined;
  wallet: IWallet | null | string | undefined;
  transactions: IPageable<ITransaction> | null | string | undefined;
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
};

export const cryptocurrencySlice = createSlice({
  name: 'cryptocurrency',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCryptocurrencies.pending, (state) => {
        state.coins = 'pending';
      })
      .addCase(
        getCryptocurrencies.fulfilled,
        (state, action: PayloadAction<IPageable<ICryptocurrency>>) => {
          state.coins = action.payload;
        }
      )
      .addCase(getCryptocurrencies.rejected, (state, action) => {
        state.coins = action.error?.message ?? 'error';
      });
  },
});

export default cryptocurrencySlice.reducer;
