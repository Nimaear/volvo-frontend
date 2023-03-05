import React, { useCallback, useMemo } from 'react';
import { TabNav, TabNavItem } from 'vcc-ui';

import { Car } from './ProductTypes';

interface ProductListFilterProps {
  cars: Car[];
  selected: string | null;
  onChange: (bodyType: string | null) => void;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const ProductListFilter: React.FC<ProductListFilterProps> = ({ cars, selected, onChange }) => {
  const bodyTypes = useMemo(() => {
    return cars.reduce((map, currentCar) => {
      map[currentCar.bodyType] = map[currentCar.bodyType] || 0;
      map[currentCar.bodyType]++;
      return map;
    }, {} as Record<string, number>);
  }, [cars]);
  const handleSelect = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onChange(event.currentTarget.value as string || null);
  }, [onChange]);
  return (
    <TabNav textAlign="center" enableLineTransition aria-label='Filter by'>
      <TabNavItem
        isActive={!selected}
        role="tab"
        value={''}
        onClick={handleSelect}
      >
        All ({ cars.length })
      </TabNavItem>
      { Object.keys(bodyTypes).map((bodyType) => {
        return (
          <TabNavItem
            key={bodyType}
            isActive={selected === bodyType}
            role="tab"
            value={bodyType}
            onClick={handleSelect}
          >
            { capitalize(bodyType) } ({ bodyTypes[bodyType] })
          </TabNavItem>
        );
      }) }
    </TabNav>
  );
};

export default ProductListFilter;
