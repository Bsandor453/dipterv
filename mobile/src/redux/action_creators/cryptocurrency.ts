import { createAsyncThunk } from '@reduxjs/toolkit';
import logging from '../../config/Logging';
import ICryptocurrency from '../../interfaces/cryptocurrency/ICryptocurrency';
import ICryptocurrencyDetails from '../../interfaces/cryptocurrency/ICryptocurrencyDetails';
import ICryptocurrencyHistory from '../../interfaces/cryptocurrency/ICryptocurrencyHistory';
import IPageable from '../../interfaces/IPageable';
import IWallet from '../../interfaces/IWallet';
import CryptocurrencyService from '../../service/CryptocurrencyService';
import { show } from '../slices/snackbarSlice';
import { RootState } from '../store';

export const getCryptocurrencies = createAsyncThunk<
  IPageable<ICryptocurrency>,
  {
    page: number;
    size: number;
    sortBy: string;
    asc: boolean;
    search: string;
  },
  { state: RootState }
>('cryptocurrency/getCryptocurrencies', async (data, thunkAPI) => {
  try {
    const response = await CryptocurrencyService.getCryptocurrencies(
      data.page,
      data.size,
      data.sortBy,
      data.asc,
      data.search
    );
    return response.data;
  } catch (error: any) {
    logging.error(error, 'cryptocurrency/getCryptocurrencies');
    if (error?.response?.data?.error && error?.response?.data?.message) {
      logging.error(
        `${error.response.data.error}: ${error.response.data.message}`,
        'cryptocurrency/getCryptocurrencies'
      );
    }
    if (error.name && error.message) {
      logging.error(
        `${error.name}: ${error.message}`,
        'cryptocurrency/getCryptocurrencies'
      );
      return thunkAPI.rejectWithValue(`${error.name}: ${error.message}`);
    } else {
      logging.error(error, 'cryptocurrency/getCryptocurrencies');
      return thunkAPI.rejectWithValue(error);
    }
  }
});

export const getCryptocurrency = createAsyncThunk<
  ICryptocurrencyDetails,
  {
    id: string;
  },
  { state: RootState }
>('cryptocurrency/getCryptocurrency', async (data, thunkAPI) => {
  try {
    const response = await CryptocurrencyService.getCryptocurrency(data.id);
    return response.data;
  } catch (error: any) {
    logging.error(error, 'cryptocurrency/getCryptocurrency');
    if (error?.response?.data?.error && error?.response?.data?.message) {
      logging.error(
        `${error.response.data.error}: ${error.response.data.message}`,
        'cryptocurrency/getCryptocurrency'
      );
    }
    if (error.name && error.message) {
      logging.error(
        `${error.name}: ${error.message}`,
        'cryptocurrency/getCryptocurrency'
      );
      return thunkAPI.rejectWithValue(`${error.name}: ${error.message}`);
    } else {
      logging.error(error, 'cryptocurrency/getCryptocurrency');
      return thunkAPI.rejectWithValue(error);
    }
  }
});

export const getWallet = createAsyncThunk<IWallet, void, { state: RootState }>(
  'cryptocurrency/getWallet',
  async (_, thunkAPI) => {
    try {
      const response = await CryptocurrencyService.getWallet();
      return response.data;
    } catch (error: any) {
      logging.error(error, 'cryptocurrency/getWallet');
      if (error?.response?.data?.error && error?.response?.data?.message) {
        logging.error(
          `${error.response.data.error}: ${error.response.data.message}`,
          'cryptocurrency/getWallet'
        );
      }
      if (error.name && error.message) {
        logging.error(
          `${error.name}: ${error.message}`,
          'cryptocurrency/getWallet'
        );
        return thunkAPI.rejectWithValue(`${error.name}: ${error.message}`);
      } else {
        logging.error(error, 'cryptocurrency/getWallet');
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

export const getCryptocurrencyHistory = createAsyncThunk<
  ICryptocurrencyHistory,
  {
    id: string;
    timeframe: string;
  },
  { state: RootState }
>('cryptocurrency/getCryptocurrencyHistory', async (data, thunkAPI) => {
  try {
    const response = await CryptocurrencyService.getCryptocurrencyHistory(
      data.id,
      data.timeframe
    );
    return response.data;
  } catch (error: any) {
    logging.error(error, 'cryptocurrency/getCryptocurrencyHistory');
    if (error?.response?.data?.error && error?.response?.data?.message) {
      logging.error(
        `${error.response.data.error}: ${error.response.data.message}`,
        'cryptocurrency/getCryptocurrencyHistory'
      );
    }
    if (error.name && error.message) {
      logging.error(
        `${error.name}: ${error.message}`,
        'cryptocurrency/getCryptocurrencyHistory'
      );
      return thunkAPI.rejectWithValue(`${error.name}: ${error.message}`);
    } else {
      logging.error(error, 'cryptocurrency/getCryptocurrencyHistory');
      return thunkAPI.rejectWithValue(error);
    }
  }
});

export const buyCryptocurrency = createAsyncThunk<
  String,
  {
    id: string;
    amount: number;
  },
  { state: RootState }
>('cryptocurrency/buyCryptocurrency', async (data, thunkAPI) => {
  try {
    await CryptocurrencyService.buyCryptocurrency(data.id, data.amount);
    return data.id;
  } catch (error: any) {
    if (error?.response?.data?.error && error?.response?.data?.message) {
      if (error.response.data.message === 'Not enough money!') {
        thunkAPI.dispatch(
          show({ message: 'Not enough money!', type: 'error' })
        );
      } else {
        thunkAPI.dispatch(
          show({
            message: `${error.response.data.error}: ${error.response.data.message}`,
            type: 'error',
          })
        );
      }
      logging.error(
        `${error.response.data.error}: ${error.response.data.message}`,
        'cryptocurrency/buyCryptocurrency'
      );
      return thunkAPI.rejectWithValue(
        `${error.response.data.error}: ${error.response.data.message}`
      );
    }
    if (error.name && error.message) {
      if (error.name === 'AxiosError') {
        thunkAPI.dispatch(
          show({ message: 'Server is unavailable!', type: 'error' })
        );
      } else {
        thunkAPI.dispatch(
          show({ message: `${error.name}: ${error.message}`, type: 'error' })
        );
      }
      logging.error(
        `${error.name}: ${error.message}`,
        'cryptocurrency/buyCryptocurrency'
      );
      return thunkAPI.rejectWithValue(`${error.name}: ${error.message}`);
    } else {
      logging.error(error, 'cryptocurrency/buyCryptocurrency');
      thunkAPI.dispatch(show({ message: error, type: 'error' }));
      return thunkAPI.rejectWithValue(error);
    }
  }
});

export const sellCryptocurrency = createAsyncThunk<
  String,
  {
    id: string;
    amount: number;
  },
  { state: RootState }
>('cryptocurrency/sellCryptocurrency', async (data, thunkAPI) => {
  try {
    await CryptocurrencyService.sellCryptocurrency(data.id, data.amount);
    return data.id;
  } catch (error: any) {
    if (error?.response?.data?.error && error?.response?.data?.message) {
      if (error.response.data.message === 'Not enough cryptocurrency!') {
        thunkAPI.dispatch(
          show({ message: 'Not enough cryptocurrency!', type: 'error' })
        );
      } else {
        thunkAPI.dispatch(
          show({
            message: `${error.response.data.error}: ${error.response.data.message}`,
            type: 'error',
          })
        );
      }
      logging.error(
        `${error.response.data.error}: ${error.response.data.message}`,
        'cryptocurrency/sellCryptocurrency'
      );
      return thunkAPI.rejectWithValue(
        `${error.response.data.error}: ${error.response.data.message}`
      );
    }
    if (error.name && error.message) {
      if (error.name === 'AxiosError') {
        thunkAPI.dispatch(
          show({ message: 'Server is unavailable!', type: 'error' })
        );
      } else {
        thunkAPI.dispatch(
          show({ message: `${error.name}: ${error.message}`, type: 'error' })
        );
      }
      logging.error(
        `${error.name}: ${error.message}`,
        'cryptocurrency/sellCryptocurrency'
      );
      return thunkAPI.rejectWithValue(`${error.name}: ${error.message}`);
    } else {
      logging.error(error, 'cryptocurrency/sellCryptocurrency');
      thunkAPI.dispatch(show({ message: error, type: 'error' }));
      return thunkAPI.rejectWithValue(error);
    }
  }
});
