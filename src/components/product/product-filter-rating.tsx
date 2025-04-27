'use client';

import { useTransition } from 'react';

import { Loader } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

import { generateReviewStars } from '@/utils/generate-review-stars';

import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { ProductFilterTitle } from './product-filter-title';

const ratingOptions = [
  { label: '1 estrela', value: 1 },
  { label: '2 estrelas', value: 2 },
  { label: '3 estrelas', value: 3 },
  { label: '4 estrelas', value: 4 },
  { label: '5 estrelas', value: 5 },
];

type ProductFilterRatingProps = {
  refetchAction: (tag: string) => Promise<void>;
};

export const ProductFilterRating = ({
  refetchAction,
}: ProductFilterRatingProps) => {
  const [isPending, startTransition] = useTransition();

  const [rating, setRating] = useQueryState(
    'rating',
    parseAsInteger.withDefault(0).withOptions({ startTransition }),
  );

  const handleOnChange = (
    checked: boolean | string,
    item: { label: string; value: number },
  ) => {
    if (checked) {
      setRating(item.value);
    } else {
      setRating(0);
    }

    setTimeout(() => {
      refetchAction('products');
    });
  };

  return (
    <div className='space-y-4'>
      <ProductFilterTitle>
        Avaliações {isPending && <Loader className='size-4 animate-spin' />}
      </ProductFilterTitle>

      {ratingOptions.map(item => (
        <div key={item.value} className='flex items-center gap-2'>
          <Checkbox
            id={item.label}
            checked={item.value === rating}
            onCheckedChange={checked => handleOnChange(checked, item)}
            className='cursor-pointer'
          />
          <Label htmlFor={item.label} className='cursor-pointer'>
            <span>{generateReviewStars(item.value)}</span>
          </Label>
        </div>
      ))}
    </div>
  );
};
