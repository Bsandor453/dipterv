import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import counterReducer from './slices/counterSlice';
import cryptocurrencyReducer from './slices/cryptocurrencySlice';
import snackbarReducer from './slices/snackbarSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    snackbar: snackbarReducer,
    crypto: cryptocurrencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
