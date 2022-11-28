import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import ISnackbar from '../../interfaces/ISnackbar';
import IUser from '../../interfaces/IUser';
import { getUserData, updateUserData } from '../action_creators/user';

export interface SnackbarState {
  user: IUser | null;
  retrieveStatus: 'init' | 'pending' | 'success' | 'error';
  updateStatus: string;
}

const initialState: SnackbarState = {
  user: null,
  retrieveStatus: 'init',
  updateStatus: 'init',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserData.pending, (state) => {
        state.retrieveStatus = 'pending';
      })
      .addCase(getUserData.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.retrieveStatus = 'success';
        state.user = action.payload;
      })
      .addCase(getUserData.rejected, (state) => {
        state.retrieveStatus = 'error';
      })
      .addCase(updateUserData.pending, (state) => {
        state.updateStatus = 'pending';
      })
      .addCase(updateUserData.fulfilled, (state) => {
        state.updateStatus = 'success';
      })
      .addCase(updateUserData.rejected, (state) => {
        state.updateStatus = 'error';
      });
  },
});

export default userSlice.reducer;
