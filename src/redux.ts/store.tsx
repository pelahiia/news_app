import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authStore';
import errorReducer from './errorStore';
import favoriteReducer from './favoriteStore';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  favorite: favoriteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
