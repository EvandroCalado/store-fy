'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { X } from 'lucide-react';

import { Loader } from '../shared/loader';
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
        Limpar Filtros
        <Loader>
          <X />
        </Loader>
      </Link>
    </Button>
  );
}
