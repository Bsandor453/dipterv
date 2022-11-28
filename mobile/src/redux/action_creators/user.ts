import { createAsyncThunk } from '@reduxjs/toolkit';
import logging from '../../config/Logging';
import IUser from '../../interfaces/IUser';
import UserService from '../../service/UserService';
import { RootState } from '../store';

export const getUserData = createAsyncThunk<IUser, void, { state: RootState }>(
  'user/getUserData',
  async (_, thunkAPI) => {
    try {
      const response = await UserService.getUserData();
      return response.data;
    } catch (error: any) {
      logging.error(error, 'user/getUserData');
      if (error?.response?.data?.error && error?.response?.data?.message) {
        logging.error(
          `${error.response.data.error}: ${error.response.data.message}`,
          'user/getUserData'
        );
      }
      if (error.name && error.message) {
        logging.error(`${error.name}: ${error.message}`, 'user/getUserData');
        return thunkAPI.rejectWithValue(`${error.name}: ${error.message}`);
      } else {
        logging.error(error, 'user/getUserData');
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

export const updateUserData = createAsyncThunk<
  String,
  IUser,
  { state: RootState }
>('user/updateUserData', async (data, thunkAPI) => {
  try {
    const response = await UserService.updateUserData(data);
    return response.data;
  } catch (error: any) {
    logging.error(error, 'user/updateUserData');
    if (error?.response?.data?.error && error?.response?.data?.message) {
      logging.error(
        `${error.response.data.error}: ${error.response.data.message}`,
        'user/updateUserData'
      );
    }
    if (error.name && error.message) {
      logging.error(`${error.name}: ${error.message}`, 'user/updateUserData');
      return thunkAPI.rejectWithValue(`${error.name}: ${error.message}`);
    } else {
      logging.error(error, 'user/updateUserData');
      return thunkAPI.rejectWithValue(error);
    }
  }
});
