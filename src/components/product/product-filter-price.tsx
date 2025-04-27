'use client';

import { useTransition } from 'react';

import { Loader } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

import { formatCurrency } from '@/utils/formatCurrency';

import { Slider } from '../ui/slider';
import { ProductFilterTitle } from './product-filter-title';

type ProductFilterPriceProps = {
  refetchAction: (tag: string) => Promise<void>;
};

export const ProductFilterPrice = ({
  refetchAction,
}: ProductFilterPriceProps) => {
  const [isPending, startTransition] = useTransition();

  const [price, setPrice] = useQueryState(
    'price',
    parseAsInteger.withDefault(0).withOptions({ startTransition }),
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
      <ProductFilterTitle>
        Preço {isPending && <Loader className='size-4 animate-spin' />}
      </ProductFilterTitle>

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
