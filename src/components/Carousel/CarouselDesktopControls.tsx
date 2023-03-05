import React, { useCallback } from 'react';
import { Flex, IconButton, Spacer } from 'vcc-ui';

interface CarouseltDesktopControlsProps {
  onChange?: (index: number) => void;
  max: number;
  current: number;
}

const CarouseltDesktopControls: React.FC<CarouseltDesktopControlsProps> = (props) => {
  const previous = useCallback(() => {
    if (props.onChange) {
      props.onChange(Math.max(0, props.current - 1));
    }
  }, [props.onChange, props.current]);

  const next = useCallback(() => {
    if (props.onChange) {
      props.onChange(Math.min(props.max - 4, props.current + 1));
    }
  }, [props.onChange, props.current, props.max]);

  return (
    <Flex extend={{ flexDirection: 'row', justifyContent: 'flex-end', display: 'none', fromL: { display: 'flex' } }}>
      <IconButton
        aria-label="Previous car"
        iconName="navigation-chevronback"
        intent="primary"
        onClick={previous}
        variant="outline"
        disabled={props.current === 0 || props.max < 4}
      />
      <Spacer />
      <IconButton
        aria-label="Next car"
        iconName="navigation-chevronforward"
        intent="primary"
        onClick={next}
        variant="outline"
        disabled={props.current === props.max - 4 || props.max < 4}
      />

    </Flex>
  );
};

export default CarouseltDesktopControls;
