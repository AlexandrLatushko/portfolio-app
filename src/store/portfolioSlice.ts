import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset, PortfolioState, initialState } from '../types';

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
        state.totalValue = calculateTotalValue(state.assets);
        state.error = undefined;
      },
      prepare(symbol: string, quantity: number) {
        const validSymbols = ['BTC', 'ETH', 'BNB', 'ADA'];
        const normalizedSymbol = symbol.toUpperCase();
        
        if (!validSymbols.includes(normalizedSymbol)) {
          throw new Error('Invalid asset symbol');
        }

        return {
          payload: {
            id: crypto.randomUUID(),
            symbol: normalizedSymbol,
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
      state.totalValue = calculateTotalValue(state.assets);
    },
    updatePrice(state, action: PayloadAction<{symbol: string; price: number; change24h: number}>) {
      state.assets = state.assets.map(asset => {
        if (asset.symbol === action.payload.symbol) {
          return {
            ...asset,
            price: action.payload.price,
            totalValue: +(asset.quantity * action.payload.price).toFixed(2),
            change24h: action.payload.change24h
          };
        }
        return asset;
      });
      state.totalValue = calculateTotalValue(state.assets);
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  },
});

const calculateTotalValue = (assets: Asset[]): number => {
  return +assets.reduce((sum, a) => sum + a.totalValue, 0).toFixed(2);
};

export const { addAsset, removeAsset, updatePrice, setError } = portfolioSlice.actions;
export default portfolioSlice.reducer;