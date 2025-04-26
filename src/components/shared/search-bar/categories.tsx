'use client';

import { useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type CategoriesProps = {
  categories: {
    category: string;
  }[];
};

export const Categories = ({ categories }: CategoriesProps) => {
  const searchParams = useSearchParams();

  const category = searchParams.get('category') || 'all';

  return (
    <Select name='category' defaultValue={category}>
      <SelectTrigger className='w-[180px] rounded-e-none'>
        <SelectValue placeholder='Todos' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key='all' value='all'>
          Todos
        </SelectItem>
        {categories.map(item => (
          <SelectItem key={item.category} value={item.category}>
            {item.category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
