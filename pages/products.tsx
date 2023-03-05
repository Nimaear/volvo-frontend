import React from 'react';
import { StyleProvider, styleRenderer, ThemePicker } from 'vcc-ui';

import ProducListPage from '../src/components/Product/ProductListPage';

const renderer = styleRenderer();

renderer.renderStatic(
  {
    margin: 0,
    padding: 0
  },
  'body'
);

function Products () {
  return (
    <React.StrictMode>
      <StyleProvider renderer={renderer}>
        <ThemePicker variant="light">
          <ProducListPage />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default Products;
