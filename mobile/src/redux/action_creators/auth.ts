import { createAsyncThunk } from '@reduxjs/toolkit';
import logging from '../../config/Logging';
import config from '../../config/MainConfig';
import IToken from '../../interfaces/IToken';
import {
  storeJwtInAsyncStorage,
  readObject,
} from '../../util/AsyncStorageUtils';
import AxiosWithInterceptors from '../../util/AxiosWithInterceptors';
import { show } from '../slices/snackbarSlice';
import { RootState } from '../store';
import AuthService from '../../service/AuthService';

export const checkLoggedIn = createAsyncThunk(
  'auth/checkLoggedIn',
  async () => {
    try {
      return await readObject('userJWT');
    } catch (error) {
      logging.error(error, 'auth/checkLoggedIn');
      throw error;
    }
  }
);

export const login = createAsyncThunk<
  IToken,
  { username: string; password: string },
  { state: RootState }
>('auth/login', async (data, thunkAPI) => {
  try {
    const response = await AuthService.login(data.username, data.password);
    const userJWT = response.data;
    storeJwtInAsyncStorage(userJWT);
    return userJWT;
  } catch (error: any) {
    if (error?.response?.data?.error && error?.response?.data?.message) {
      if (error.response.data.message === 'Bad credentials') {
        thunkAPI.dispatch(
          show({ message: 'Wrong username or password!', type: 'error' })
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
        'auth/login'
      );
      return thunkAPI.rejectWithValue(
        `${error.response.data.error}: ${error.response.data.message}`
      );
    }
    if (error.name && error.message) {
      if (error.name === 'AxiosError') {
        thunkAPI.dispatch(
          show({ message: 'Server in unavailable!', type: 'error' })
        );
      } else {
        thunkAPI.dispatch(
          show({ message: `${error.name}: ${error.message}`, type: 'error' })
        );
      }
      logging.error(`${error.name}: ${error.message}`, 'auth/login');
      return thunkAPI.rejectWithValue(`${error.name}: ${error.message}`);
    } else {
      logging.error(error, 'auth/login');
      thunkAPI.dispatch(show({ message: error, type: 'error' }));
      return thunkAPI.rejectWithValue(error);
    }
  }
});
