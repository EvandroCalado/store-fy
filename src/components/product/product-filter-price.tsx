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
        title='Selecionar o Preço'
        aria-label='Selecionar o Preço'
        defaultValue={[price]}
        onValueChange={handleOnChange}
        className='cursor-pointer'
      />
      <div className='flex items-center justify-between text-xs font-semibold'>
        <span title='Preço selecionado' aria-label='Preço selecionado'>
          {formatCurrency(price)}
        </span>
        <span title='Preço máximo' aria-label='Preço máximo'>
          {formatCurrency(maxPrice)}
        </span>
      </div>
    </div>
  );
};
