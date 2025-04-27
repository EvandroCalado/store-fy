'use client';

import { parseAsString, useQueryState } from 'nuqs';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const categories = [
  {
    name: 'Todos',
    value: 'Todos',
  },
  {
    name: 'Mesas & assentos kids',
    value: 'Mesas & assentos kids',
  },
  {
    name: 'Luminárias',
    value: 'Luminárias',
  },
  {
    name: 'Decoração',
    value: 'Decoração',
  },
  {
    name: 'Bancos',
    value: 'Bancos',
  },
];

type AdminProductsCategoryProps = {
  refetchAction: (tag: string) => Promise<void>;
};

export function AdminProductsCategory({
  refetchAction,
}: AdminProductsCategoryProps) {
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault(''),
  );

  const handleOnChanger = (value: string) => {
    setCategory(value);

    setTimeout(() => {
      refetchAction('products');
    });
  };

  return (
    <Select value={category} onValueChange={handleOnChanger}>
      <SelectTrigger>
        <SelectValue placeholder='Filtrar Categoria' />
      </SelectTrigger>
      <SelectContent>
        {categories.map(category => (
          <SelectItem key={category.value} value={category.value}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
