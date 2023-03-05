import React from 'react';
import { Flex, Link, Spacer, Text, useTheme } from 'vcc-ui';

import ProductImage from './ProductImage';
import { Car } from './ProductTypes';

interface ProductCardProps {
  car: Car;
  width?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ car, width = 300 }) => {
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
      <Text variant="bates">{ car.bodyType }</Text>
      <Flex extend={{ fromL: { flexDirection: 'row', alignItems: 'center', gap: theme.baselineGrid } }}>
        <Text variant="bates" subStyle="emphasis">{ car.modelName }</Text>
        <Text variant="bates">
          { ' ' }{ car.modelType }
        </Text>
      </Flex>
      <Spacer size={2} />
      <ProductImage url={car.imageUrl} description={`${car.modelName} (${car.modelType})`} />
      <Spacer />
      <Flex extend={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Link arrow="right" href={`/learn/${car.id}`}>Learn</Link>
        <Spacer size={4} />
        <Link arrow="right" href={`/shop/${car.id}`}>Shop</Link>
      </Flex>
    </Flex >
  );
};

export default ProductCard;
