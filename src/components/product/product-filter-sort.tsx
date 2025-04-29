'use client';

import { useTransition } from 'react';

import { Loader } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const sortOptions = [
  { value: 'newest', name: 'Mais Recentes' },
  { value: 'rating', name: 'Avaliação' },
  { value: 'lowest', name: 'Menor Preço' },
  { value: 'highest', name: 'Maior Preço' },
];

type ProductFilterSortProps = {
  refetchAction: (tag: string) => Promise<void>;
};

export function ProductFilterSort({ refetchAction }: ProductFilterSortProps) {
  const [isPending, startTransition] = useTransition();

  const [sort, setSort] = useQueryState(
    'sort',
    parseAsString.withDefault('newest').withOptions({ startTransition }),
  );

  const handleOnChanger = (value: string) => {
    setSort(value);

    setTimeout(() => {
      refetchAction('products');
    });
  };

  return (
    <Select
      value={sort}
      onValueChange={handleOnChanger}
      aria-label='Filtrar Categoria'
    >
      <SelectTrigger className='w-36 [&>span]:flex-1 [&>span]:justify-center'>
        <SelectValue
          placeholder='Filtrar Categoria'
          title='Filtrar Categoria'
          aria-label='Filtrar Categoria'
        />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map(sort => (
          <SelectItem
            key={sort.value}
            value={sort.value}
            title={sort.name}
            aria-label={sort.name}
          >
            {isPending ? <Loader className='size-4 animate-spin' /> : sort.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
