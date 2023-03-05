import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Block, Flex, Message, Spacer, useTheme } from 'vcc-ui';

import Carousel from '../Carousel/Carousel';

import ProductCard from './ProductCard';
import ProductListFilter from './ProductListFilter';
import ProductListPlaceholder from './ProductListPlaceholder';
import { Car } from './ProductTypes';

// Our simple fetcher for SWR. This would usually be a lot more robust, but this will suffice for this example.
const fetcher = (url: string) => fetch(url).then(async (res) => {
  if (res.ok) {
    try {
      const cars = await res.json();
      if (!Array.isArray(cars)) {
        throw new Error();
      }
      return cars;
    } catch {
      throw new Error('Unexpected response from server.');
    }
  } else {
    let error = 'Unexpected response from server.';
    try {
      const payload = await res.json();
      error = payload.error;
    } catch {
    }
    throw new Error(error);
  }
});

const ProducList: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);

  const { data, error } = useSWR<Car[], any, any>('/api/cars', fetcher);
  const { breakpoint, baselineGrid } = useTheme();
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    setCars(data?.filter(car => filter === null || car.bodyType === filter) || []);
  }, [data, filter, setCars]);

  if (!error && !data) {
    return <ProductListPlaceholder />;
  }

  return (
    <>
      { data && <ProductListFilter cars={data} onChange={setFilter} selected={filter}/> }
      <Spacer size={4} />
      <Flex
        extend={{
          overflow: 'hidden',
          transform: 'translate3d(0,0,0)',
          margin: 'auto',
          width: '100%',
          fromL: {
            width: breakpoint.size.large
          }
        }}
      >
        { error && (
          <Block extend={{ padding: baselineGrid * 4 }} >
            <Message type="error">{ error.message }</Message>
          </Block>
        ) }
        { (!error && data) && (
          <Carousel max={cars.length || 0} data={cars}>
            { cars.map(car => <ProductCard key={car.id} car={car} />) }
          </Carousel>
        ) }
      </Flex>
    </>
  );
};

export default ProducList;
