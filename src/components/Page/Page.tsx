import React from 'react';
import { View } from 'vcc-ui';

const Page: React.FC = ({ children }) => {
  return (
    <View extend={{ margin: 'auto' }} className="volvo_v0">
      { children }
    </View>
  );
};

export default Page;
