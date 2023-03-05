import React from 'react';
import { Block } from 'vcc-ui';

interface ShimmerProps {
  width: number | string;
  height?: number | string;
  rounded?: boolean;
}

// Not really sure why animationName seems to look to be throwing a typescript error
// As it's clearly documented to be working this way and it actually seems to work fine
const Shimmer: React.FC<ShimmerProps> = ({ width, height = 16, rounded }) => {
  return (
    <Block
        // @ts-ignore
      extend={{
        width,
        height,
        borderRadius: rounded ? '50%' : 0,
        animationDuration: '2.2s',
        animationFillMode: 'forwards',
        animationIterationCount: 'infinite',
        animationName: {
          '0%': {
            backgroundPosition: '-1200px 0'
          },
          '100%': {
            backgroundPosition: '1200px 0'
          }
        },
        animationTimingFunction: 'linear',
        background: 'linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%)',
        backgroundSize: '1200px 100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  );
};

export default Shimmer;
