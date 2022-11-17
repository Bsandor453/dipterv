import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IToken from '../../interfaces/IToken';
import { removeItem } from '../../util/AsyncStorageUtils';
import { checkLoggedIn, login } from '../action_creators/auth';

export interface AuthState {
  isLoggedIn: boolean;
  token: IToken | null;
  loginStatus: 'init' | 'pending' | 'success' | 'error';
  error?: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  loginStatus: 'init',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      removeItem('userJWT');
      removeItem('token_expires_at');
      removeItem('token_valid_since');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
        state.loginStatus = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.loginStatus = 'error';
      })
      .addCase(
        checkLoggedIn.fulfilled,
        (state, action: PayloadAction<IToken>) => {
          state.isLoggedIn = !!action.payload;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
