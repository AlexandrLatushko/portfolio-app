import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import AssetRow from './AssetRow';
import { Asset } from '../../../types';

const AssetList = ({ assets }: { assets: Asset[] }) => (
  <AutoSizer>
    {({ height, width }) => (
      <List
        height={height}
        width={width}
        itemSize={70}
        itemCount={assets.length}
        itemData={assets}
      >
        {({ data, index, style }) => (
          <AssetRow data={data} index={index} style={style} />
        )}
      </List>
    )}
  </AutoSizer>
);

export default AssetList;