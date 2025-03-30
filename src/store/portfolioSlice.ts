import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset, PortfolioState } from '../types';

const initialState: PortfolioState = {
  assets: [],
  totalValue: 0,
  status: 'idle',
  error: undefined,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addAsset: {
      reducer(state, action: PayloadAction<Asset>) {
        const existing = state.assets.find(a => a.symbol === action.payload.symbol);
        if (existing) {
          state.error = 'Asset already exists';
          return;
        }
        state.assets.push(action.payload);
        state.totalValue = state.assets.reduce((sum, a) => sum + a.totalValue, 0);
        state.error = undefined;
      },
      prepare(symbol: string, quantity: number) {
        return {
          payload: {
            id: crypto.randomUUID(),
            symbol,
            quantity,
            price: 0,
            totalValue: 0,
            change24h: 0,
          }
        };
      }
    },
    removeAsset(state, action: PayloadAction<string>) {
      state.assets = state.assets.filter(a => a.id !== action.payload);
      state.totalValue = state.assets.reduce((sum, a) => sum + a.totalValue, 0);
    },
    updatePrice(state, action: PayloadAction<{symbol: string; price: number; change24h: number}>) {
      state.assets = state.assets.map(asset => {
        if (asset.symbol === action.payload.symbol) {
          return {
            ...asset,
            price: action.payload.price,
            totalValue: asset.quantity * action.payload.price,
            change24h: action.payload.change24h,
          };
        }
        return asset;
      });
      state.totalValue = state.assets.reduce((sum, a) => sum + a.totalValue, 0);
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  },
});

export const { addAsset, removeAsset, updatePrice, setError } = portfolioSlice.actions;
export default portfolioSlice.reducer;