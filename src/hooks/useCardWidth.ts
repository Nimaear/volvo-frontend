import { useEffect, useState } from 'react';
import { CurrentTheme, useTheme } from 'vcc-ui';

// This function calculates the width of a card based on the screen width
const getCardWidthFromScreenWidth = (breakpoint: CurrentTheme['breakpoint'], innerWidth: number): number => {
  if (innerWidth > breakpoint.size.large) {
    return Math.min(innerWidth, 1024) / 4;
  }
  if (innerWidth > breakpoint.size.medium) {
    return innerWidth / 2.5;
  }
  return innerWidth / 1.5;
};

const useCardWidth = () => {
  const [cardWidth, setCardWidth] = useState(300);
  const { breakpoint } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidthFromScreenWidth(breakpoint, window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint, setCardWidth]);

  return cardWidth;
};

export default useCardWidth;
