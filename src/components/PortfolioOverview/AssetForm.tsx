import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { motion } from 'framer-motion';
import { addAsset, setError } from '../../store/portfolioSlice';

const AssetForm = () => {
  const [symbol, setSymbol] = useState('BTC');
  const [quantity, setQuantity] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantity || isNaN(+quantity)) {
      dispatch(setError('Invalid quantity'));
      return;
    }
    dispatch(addAsset(symbol, parseFloat(quantity)));
    setQuantity('');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="asset-form"
    >
      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        aria-label="Select asset"
      >
        {['BTC', 'ETH', 'BNB', 'ADA', 'SOL'].map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        step="0.0001"
        min="0"
        aria-label="Enter quantity"
      />
      
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Asset
      </motion.button>
    </motion.form>
  );
};

export default AssetForm;