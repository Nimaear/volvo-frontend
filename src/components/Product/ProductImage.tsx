import React from 'react';
import { Block } from 'vcc-ui';

interface ProductImageProps {
  url: string;
  description: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ url, description }) => {
  return (
    <picture>
      <Block
        as="img"
        extend={{
          width: '100%',
          userDrag: 'none',
          userSelect: 'none',
          '-webkit-user-drag': 'none'
        }}
        src={url}
        alt={description}
      />
    </picture>
  );
};

export default ProductImage;
