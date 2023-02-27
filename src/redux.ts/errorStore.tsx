import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorType } from '../types/ErrorType';

interface ErrorState {
  error: ErrorType | null;
}

const initialState: ErrorState = {
  error: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<ErrorType | null>) {
      return { ...state, error: action.payload };
    },
    clearError(state) {
      return { ...state, error: null };
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
