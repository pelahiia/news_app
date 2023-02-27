import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorType } from '../types/ErrorType';

interface AuthState {
  isLoggedIn: boolean;
  error: ErrorType | null;
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state) {
      return { ...state, isLoggedIn: true, error: null };
    },
    loginFailure(state, action: PayloadAction<ErrorType | null>) {
      return { ...state, isLoggedIn: false, error: action.payload };
    },
    logout(state) {
      return { ...state, isLoggedIn: false, error: null };
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
