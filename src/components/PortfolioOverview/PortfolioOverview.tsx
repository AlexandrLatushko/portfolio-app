import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import useWebSocket from '../../hooks/useWebSocket';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import AssetForm from './AssetForm';
import AssetList from './AssetList';
import styles from './PortfolioOverview.module.css';

const PortfolioOverview = () => {
  const { assets, totalValue, error } = useAppSelector(state => state.portfolio);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const symbols = assets.map(a => a.symbol);
  
  useWebSocket(symbols);

  useEffect(() => {
    const socket = io('wss://stream.binance.com:9443/ws', {
      path: '/stream',
      transports: ['websocket']
    });

    socket.on('connect', () => {
      setConnectionStatus('connected');
    });

    socket.on('disconnect', () => {
      setConnectionStatus('connecting');
    });

    socket.on('connect_error', () => {
      setConnectionStatus('error');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.statusBar}>
        <div className={`${styles.statusIndicator} ${styles[connectionStatus]}`}>
          {connectionStatus.toUpperCase()}
        </div>
        <div className={styles.header}>
          <h1>Portfolio Overview</h1>
          <div className={styles.totalValue}>Total Value: ${totalValue.toFixed(2)}</div>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <motion.div 
        className={styles.formContainer}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <AssetForm />
      </motion.div>

      <div className={styles.listHeader}>
        <div>Asset</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Value</div>
        <div>24h Change</div>
        <div>Portfolio %</div>
      </div>

      <AssetList assets={assets} />
    </motion.div>
  );
};

export default PortfolioOverview;