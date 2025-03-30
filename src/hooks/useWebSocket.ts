import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { io, Socket } from 'socket.io-client';
import { updatePrice, setError } from '../store/portfolioSlice';

const useWebSocket = (symbols: string[]) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (symbols.length === 0) return;

    const streams = symbols.map(s => `${s.toLowerCase()}usdt@ticker`);
    let socket: Socket;

    try {
      socket = io('wss://stream.binance.com:9443/ws', {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        path: '/stream'
      });

      socket.on('connect', () => {
        console.log('WebSocket connected');
        socket.emit('SUBSCRIBE', streams);
      });

      socket.on('message', (rawData: string) => {
        try {
          const data = JSON.parse(rawData);
          if (data.stream?.endsWith('@ticker')) {
            const ticker = data.data;
            dispatch(updatePrice({
              symbol: ticker.s.replace('USDT', '').toUpperCase(),
              price: parseFloat(ticker.c),
              change24h: parseFloat(ticker.P)
            }));
          }
        } catch (err) {
          console.error('Message processing error:', err);
        }
      });

      socket.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
        dispatch(setError('Connection error. Trying to reconnect...'));
      });

    } catch (err) {
      console.error('WebSocket initialization failed:', err);
      dispatch(setError('WebSocket connection failed'));
    }

    return () => {
      if (socket) {
        socket.off('message');
        socket.disconnect();
      }
    };
  }, [symbols, dispatch]);

  return null;
};

export default useWebSocket;