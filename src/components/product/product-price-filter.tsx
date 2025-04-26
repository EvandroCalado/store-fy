'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import { formatCurrency } from '@/utils/formatCurrency';

import { Slider } from '../ui/slider';
import { ProductFilterTitle } from './product-filter-title';

type ProductPriceFilterProps = {
  refetchAction: (tag: string) => Promise<void>;
};

export const ProductPriceFilter = ({
  refetchAction,
}: ProductPriceFilterProps) => {
  const [price, setPrice] = useQueryState(
    'price',
    parseAsInteger.withDefault(0),
  );

  const maxPrice = 10000;

  const handleOnChange = (value: number[]) => {
    setPrice(value[0]);

    setTimeout(() => {
      refetchAction('products');
    });
  };

  return (
    <div className='space-y-4'>
      <ProductFilterTitle>Preço</ProductFilterTitle>

      <Slider
        max={10000}
        step={100}
        defaultValue={[price]}
        onValueChange={handleOnChange}
      />
      <div className='flex items-center justify-between text-xs font-semibold'>
        <span>{formatCurrency(price)}</span>
        <span>{formatCurrency(maxPrice)}</span>
      </div>
    </div>
  );
};
