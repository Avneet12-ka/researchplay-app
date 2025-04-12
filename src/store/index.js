
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import papersReducer from './papersSlice';
import gamesReducer from './gamesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    papers: papersReducer,
    games: gamesReducer,
  },
});
