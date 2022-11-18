import { createAsyncThunk } from '@reduxjs/toolkit';
import logging from '../../config/Logging';
import ICryptocurrency from '../../interfaces/cryptocurrency/ICryptocurrency';
import IPageable from '../../interfaces/IPageable';
import CryptocurrencyService from '../../service/CryptocurrencyService';
import { RootState } from '../store';

const getCryptocurrencies = createAsyncThunk<
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
    logging.error(error, 'auth/login');
    if (error?.response?.data?.error && error?.response?.data?.message) {
      logging.error(
        `${error.response.data.error}: ${error.response.data.message}`,
        'auth/login'
      );
    }
    if (error.name && error.message) {
      logging.error(`${error.name}: ${error.message}`, 'auth/login');
      return thunkAPI.rejectWithValue(`${error.name}: ${error.message}`);
    } else {
      logging.error(error, 'auth/login');
      return thunkAPI.rejectWithValue(error);
    }
  }
});

export default getCryptocurrencies;
