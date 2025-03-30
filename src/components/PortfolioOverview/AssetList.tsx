import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import AssetRow from './AssetRow';
import { Asset } from '../../types';
import styles from './AssetList.module.css';

const AssetList = ({ assets }: { assets: Asset[] }) => (
  <div className={styles.listContainer}>
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          itemSize={70}
          itemCount={assets.length}
          itemData={assets}
        >
          {(props) => <AssetRow {...props} />}
        </List>
      )}
    </AutoSizer>
  </div>
);

export default AssetList;