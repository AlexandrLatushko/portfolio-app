import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './portfolioSlice';
import { loadState } from '../utils/localStorage';

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
  preloadedState: {
    portfolio: loadState() || undefined,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;