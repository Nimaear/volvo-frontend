import React, { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { CurrentTheme, Flex, Spacer, useTheme } from 'vcc-ui';

import useCardWidth from '../../hooks/useCardWidth';

import CarouseltDesktopControls from './CarouselDesktopControls';
import CarouselScollIndicator from './CarouselScrollIndicator';

// This function calculates the amount of cards that are visible based on the screen width
const getAmountOfCardsVisible = (breakpoint: CurrentTheme['breakpoint'], innerWidth: number): number => {
  if (innerWidth > breakpoint.size.large) {
    return 4;
  }
  if (innerWidth > breakpoint.size.medium) {
    return 2;
  }
  return 1;
};

interface CarouselProps {
  max: number;
  data: unknown[];
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const cardWidth = useCardWidth();
  const [amountOfCardsVisible, setAmountOfCardsVisible] = useState(1);
  const [horizontalPosition, setHorizontalPosition] = useState(0);
  const { breakpoint } = useTheme();

  const previous = useCallback(() => {
    setHorizontalPosition(Math.max(0, horizontalPosition - 1));
  }, [setHorizontalPosition, horizontalPosition]);

  const next = useCallback(() => {
    setHorizontalPosition(Math.min(props.max - amountOfCardsVisible, horizontalPosition + 1));
  }, [setHorizontalPosition, amountOfCardsVisible, horizontalPosition, props.max]);

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: previous,
    trackMouse: true
  });

  // Reset position on change of data and screen change
  useEffect(() => {
    setHorizontalPosition(0);
  }, [props.data, amountOfCardsVisible]);

  // Update amount of cards visible on screen change
  useEffect(() => {
    const handleResize = () => {
      setAmountOfCardsVisible(getAmountOfCardsVisible(breakpoint, window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return (
    <>
      <Flex
        role="list"
        extend={{
          flexDirection: 'row',
          flexFlow: 'row nowrap',
          transform: `translate3d(-${horizontalPosition * cardWidth}px,0,0);`,
          transition: 'transform 0.3s ease-in-out',
          userSelect: 'none'
        }}
        {...handlers}
      >
        { React.Children.map(props.children, (child) => {
          return React.cloneElement(child as React.ReactElement, { width: cardWidth });
        }) }
      </Flex>
      <Spacer size={4} />
      <CarouseltDesktopControls onChange={setHorizontalPosition} current={horizontalPosition} max={props.data.length} />
      { props.data.length - amountOfCardsVisible + 1 > amountOfCardsVisible && <CarouselScollIndicator onChange={setHorizontalPosition} current={horizontalPosition} max={props.max - amountOfCardsVisible + 1} /> }
    </>
  );
};

export default Carousel;
