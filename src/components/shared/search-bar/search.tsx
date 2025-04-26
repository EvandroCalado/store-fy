'use client';

import { useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';

export const Search = () => {
  const searchParams = useSearchParams();

  const query = searchParams.get('query') || '';

  return (
    <Input
      name='query'
      type='search'
      defaultValue={query}
      placeholder='Pesquisar...'
      className='rounded-none'
    />
  );
};
