import React from 'react';
import { Flex, Spacer, useTheme } from 'vcc-ui';

import Shimmer from '../Shimmer/Shimmer';

interface ProductCardPlaceholderProps {
  width?: number;
}

const ProductCardPlaceholder: React.FC<ProductCardPlaceholderProps> = ({ width = 300 }) => {
  const theme = useTheme();
  return (
    <Flex
      extend={{
        flexDirection: 'column',
        flexShrink: 0,
        boxSizing: 'border-box',
        flexGrow: 0,
        userSelect: 'none',
        paddingLeft: theme.baselineGrid,
        paddingRight: theme.baselineGrid
      }}
      style={{ width }}
      role="listitem" draggable="false"
    >
      <Shimmer width={40} />
      <Spacer />
      <Flex extend={{ fromL: { flexDirection: 'row', alignItems: 'center', gap: theme.baselineGrid } }}>
        <Shimmer width={100} />
        <Spacer />
        <Shimmer width={80} />
      </Flex>
      <Spacer size={4} />
      <Shimmer width={width - 2 * theme.baselineGrid} height={(width - 2 * theme.baselineGrid) * 0.75}/>
      <Spacer />
      <Flex extend={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Shimmer width={80} />
        <Spacer size={4} />
        <Shimmer width={80} />
      </Flex>
    </Flex >
  );
};

export default ProductCardPlaceholder;
