import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ListChildComponentProps } from 'react-window';
import { Asset } from '../../types';
import styles from './AssetRow.module.css';
import { removeAsset } from '../../store/portfolioSlice';

const AssetRow = ({ data, index, style }: ListChildComponentProps<Asset[]>) => {
  const dispatch = useAppDispatch();
  const totalValue = useAppSelector(state => state.portfolio.totalValue);
  const asset = data[index];
  const percentage = totalValue > 0 ? (asset.totalValue / totalValue) * 100 : 0;

  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={styles.row}
      onClick={() => dispatch(removeAsset(asset.id))}
    >
      <div className={styles.cell}>{asset.symbol}</div>
      <div className={styles.cell}>{asset.quantity.toFixed(4)}</div>
      <div className={styles.cell}>${asset.price.toFixed(2)}</div>
      <div className={styles.cell}>${asset.totalValue.toFixed(2)}</div>
      <div className={`${styles.cell} ${asset.change24h >= 0 ? styles.positive : styles.negative}`}>
        {asset.change24h.toFixed(2)}%
      </div>
      <div className={styles.cell}>
        <div className={styles.percentageBar}>
          <div 
            className={styles.percentageFill} 
            style={{ width: `${percentage}%` }}
            aria-label={`Portfolio percentage ${percentage.toFixed(1)}%`}
          />
          <span>{percentage.toFixed(1)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AssetRow;