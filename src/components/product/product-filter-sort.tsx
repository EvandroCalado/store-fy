'use client';

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

export const ProductFilterSort = ({
  refetchAction,
}: ProductFilterSortProps) => {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsString.withDefault('newest'),
  );

  const handleOnChanger = (value: string) => {
    setSort(value);

    setTimeout(() => {
      refetchAction('products');
    });
  };

  return (
    <Select value={sort} onValueChange={handleOnChanger}>
      <SelectTrigger>
        <SelectValue placeholder='Filtrar Categoria' />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map(sort => (
          <SelectItem key={sort.value} value={sort.value}>
            {sort.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
