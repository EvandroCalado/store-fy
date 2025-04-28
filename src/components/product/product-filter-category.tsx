'use client';

import { useTransition } from 'react';

import { parseAsString, useQueryState } from 'nuqs';

import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { ProductFilterTitle } from './product-filter-title';
import { ProductLoader } from './product-loader';

type ProductFilterCategoryProps = {
  categories: {
    category: string;
  }[];
  refetchAction: (tag: string) => Promise<void>;
};

export function ProductFilterCategory({
  categories,
  refetchAction,
}: ProductFilterCategoryProps) {
  const [isPending, startTransition] = useTransition();

  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault('').withOptions({ startTransition }),
  );

  const handleOnChange = (
    checked: boolean | string,
    item: { category: string },
  ) => {
    const isChecked = checked === true;

    if (isChecked) {
      setCategory(item.category);
    } else {
      setCategory(null);
    }

    setTimeout(() => {
      refetchAction('products');
    });
  };

  return (
    <div className='space-y-4'>
      {isPending && <ProductLoader />}
      <ProductFilterTitle>Categorias</ProductFilterTitle>

      {categories.map(item => (
        <div key={item.category} className='flex items-center gap-2'>
          <Checkbox
            id={item.category}
            checked={category === item.category}
            onCheckedChange={checked => handleOnChange(checked, item)}
            title={item.category}
            aria-label={item.category}
            className='cursor-pointer'
          />
          <Label htmlFor={item.category} className='cursor-pointer'>
            {item.category}
          </Label>
        </div>
      ))}
    </div>
  );
}
