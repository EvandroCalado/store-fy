'use client';

import { useRouter } from 'next/navigation';

import { createSerializer, parseAsString } from 'nuqs';

import { Input } from '@/components/ui/input';

const serialize = createSerializer({
  query: parseAsString.withDefault(''),
});

export const Search = () => {
  const router = useRouter();

  const handleSearch = (value: string) => {
    const url = serialize('/products', { query: value });
    router.push(url);
  };

  return (
    <Input
      type='search'
      placeholder='Pesquisar...'
      onChange={e => handleSearch(e.target.value)}
      className='max-w-xs'
    />
  );
};
