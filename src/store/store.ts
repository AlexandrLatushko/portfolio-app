import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './portfolioSlice';
import { loadState, saveState } from '../utils/localStorage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
  preloadedState: preloadedState ? { portfolio: preloadedState } : undefined,
});

store.subscribe(() => {
  saveState(store.getState().portfolio);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;