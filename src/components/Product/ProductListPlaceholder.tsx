import React from 'react';
import { Flex, Spacer, useTheme } from 'vcc-ui';

import useCardWidth from '../../hooks/useCardWidth';
import CarouseltDesktopControls from '../Carousel/CarouselDesktopControls';
import CarouselScollIndicator from '../Carousel/CarouselScrollIndicator';
import Shimmer from '../Shimmer/Shimmer';

import ProductCardPlaceholder from './ProductCardPlaceholder';

const ProductListPlaceholder: React.FC = () => {
  const { breakpoint } = useTheme();
  const cardWidth = useCardWidth();

  return (
    <>
      <Spacer size={2}/>
      <Flex
        extend={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fromM: {
            flexDirection: 'row'
          }
        }}
        role="tablist"
      >
        <Shimmer width={100} height={24}/>
        <Spacer />
        <Shimmer width={100} height={24} />
        <Spacer />
        <Shimmer width={100} height={24} />
        <Spacer />
        <Shimmer width={100} height={24} />
      </Flex>
      <Spacer size={2}/>
      <Flex
        extend={{
          overflow: 'hidden',
          margin: 'auto',
          width: '100%',
          fromL: {
            width: breakpoint.size.large
          }
        }}
      >
        <Flex
          extend={{
            flexDirection: 'row',
            flexFlow: 'row nowrap',
            transition: 'transform 0.3s ease-in-out',
            userSelect: 'none'
          }}
        >
          <ProductCardPlaceholder width={cardWidth} />
          <ProductCardPlaceholder width={cardWidth} />
          <ProductCardPlaceholder width={cardWidth} />
          <ProductCardPlaceholder width={cardWidth} />
        </Flex>
        <Spacer size={4} />
        <CarouseltDesktopControls current={0} max={4} />
        <CarouselScollIndicator current={0} max={4} />
      </Flex>
    </>
  );
};

export default ProductListPlaceholder;
