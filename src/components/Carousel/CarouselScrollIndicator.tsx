import React from 'react';
import { Block, Flex, useTheme } from 'vcc-ui';

interface CarouselScollIndicatorProps {
  max: number;
  current: number;
  onChange?: (index: number) => void;
}

const CarouselScollIndicator: React.FC<CarouselScollIndicatorProps> = ({ max, current, onChange }) => {
  const theme = useTheme();
  return (
    <Flex
      extend={{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: theme.baselineGrid,
        fromL: {
          display: 'none'
        }
      }}
    >
      { Array.from(Array(Math.max(max, 0)).keys()).map((index) => {
        const active = index === current;
        return (
          <Block
            as="button"
            role="button"
            key={index}
            extend={{
              display: 'block',
              border: 'none',
              background: 'none',
              boxSizing: 'border-box',
              padding: 0,
              margin: 0,
              cursor: 'pointer',
              width: theme.baselineGrid,
              height: theme.baselineGrid,
              borderRadius: '50%',
              backgroundColor: active ? theme.color.foreground.primary : theme.color.foreground.secondary,
              transition: 'background-color 0.3s ease-in-out, opacity 0.3s ease-in-out',
              opacity: active ? 1 : 0.25

            }}
            onClick={() => onChange && onChange(index)}
          />
        );
      }) }
    </Flex>
  );
};

export default CarouselScollIndicator;
