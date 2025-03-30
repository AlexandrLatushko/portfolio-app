import { PortfolioState } from '../types';

export const loadState = (): PortfolioState | undefined => {
  try {
    const serializedState = localStorage.getItem('portfolioState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Failed to load state:', err);
    return undefined;
  }
};

export const saveState = (state: PortfolioState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('portfolioState', serializedState);
  } catch (err) {
    console.error('Failed to save state:', err);
  }
};