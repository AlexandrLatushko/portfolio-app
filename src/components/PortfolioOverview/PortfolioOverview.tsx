import { motion } from 'framer-motion';
import AssetForm from './AssetForm';
import AssetList from './AssetList';
import styles from './PortfolioOverview.module.css';
import { useAppSelector } from '../../store/hooks';
import useWebSocket from '../../hooks/useWebSocket';

const PortfolioOverview = () => {
  const { assets, totalValue, error } = useAppSelector(state => state.portfolio);
  const symbols = assets.map(a => a.symbol);
  
  useWebSocket(symbols);

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.header}>
        <h1>Portfolio Overview</h1>
        <div>Total Value: ${totalValue.toFixed(2)}</div>
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