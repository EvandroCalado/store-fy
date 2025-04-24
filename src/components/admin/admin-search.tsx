'use client';

import { ChangeEvent } from 'react';

import { usePathname } from 'next/navigation';

import { parseAsString, useQueryState } from 'nuqs';

import { Input } from '../ui/input';

type AdminSearchProps = {
  refetchAction: (tag: string) => Promise<void>;
};

export const AdminSearch = ({ refetchAction }: AdminSearchProps) => {
  const pathname = usePathname();

  const [query, setQuery] = useQueryState(
    'query',
    parseAsString.withDefault(''),
  );

  const pathnameDict = {
    '/admin/orders': 'orders',
    '/admin/products': 'products',
    '/admin/users': 'users',
  };

  const handleOnChanger = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    setTimeout(() => {
      refetchAction(pathnameDict[pathname as keyof typeof pathnameDict]);
    });
  };

  return (
    <Input
      type='search'
      value={query}
      onChange={handleOnChanger}
      placeholder='Buscar...'
      className='max-w-xs'
    />
  );
};
