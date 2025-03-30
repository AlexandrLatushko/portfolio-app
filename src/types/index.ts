export interface Asset {
    id: string;
    symbol: string;
    quantity: number;
    price: number;
    totalValue: number;
    change24h: number;
  }
  
  export interface PortfolioState {
    assets: Asset[];
    totalValue: number;
    status: 'idle' | 'loading' | 'failed';
    error?: string;
  }