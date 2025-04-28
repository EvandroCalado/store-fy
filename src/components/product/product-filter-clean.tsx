'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { X } from 'lucide-react';

import { GlobalLoader } from '../shared/global-loader';
import { Button } from '../ui/button';

export function ProductFilterClean() {
  const searchParams = useSearchParams();

  const hasFilters =
    searchParams.has('query') ||
    searchParams.has('category') ||
    searchParams.has('price') ||
    searchParams.has('rating') ||
    searchParams.has('sort');

  if (!hasFilters) return null;

  return (
    <Button asChild variant='secondary'>
      <Link href='/products' className='text-muted-foreground'>
        <GlobalLoader />
        Limpar Filtros
        <X />
      </Link>
    </Button>
  );
}
