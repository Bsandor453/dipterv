import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import ISnackbar from '../../interfaces/ISnackbar';

export interface SnackbarState {
  visible: boolean;
  message: string;
  type: 'info' | 'success' | 'error';
}

const initialState: SnackbarState = {
  visible: false,
  message: '',
  type: 'info',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<ISnackbar>) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hide: (state) => {
      state.visible = false;
    },
  },
});

export const { show, hide } = snackbarSlice.actions;
export default snackbarSlice.reducer;
