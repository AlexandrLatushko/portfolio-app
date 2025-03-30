import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { io } from 'socket.io-client';

const useWebSocket = (symbols: string[]) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (symbols.length === 0) return;

    const streams = symbols.map(s => `${s.toLowerCase()}usdt@ticker`);
    const socket = io('wss://stream.binance.com:9443/stream', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      socket.emit('subscribe', streams);
    });

    socket.on('message', (data: any) => {
      if (data.stream.endsWith('@ticker')) {
        const { s: symbol, c: price, P: change } = data.data;
        dispatch(updatePrice({
          symbol: symbol.replace('USDT', ''),
          price: parseFloat(price),
          change24h: parseFloat(change),
        }));
      }
    });

    socket.on('connect_error', (err) => {
      dispatch(setError(`WebSocket error: ${err.message}`));
    });

    return () => {
      socket.disconnect();
    };
  }, [symbols, dispatch]);
};

export default useWebSocket;