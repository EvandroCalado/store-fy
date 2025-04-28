'use client';

import { useTransition } from 'react';

import { parseAsInteger, useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { TransitionLoader } from '../transition-loader';

type PaginationProps = {
  totalPages: number;
  refetchAction: (tag: string) => Promise<void>;
  className?: string;
};

export function Pagination({
  totalPages,
  refetchAction,
  className,
}: PaginationProps) {
  const [isPending, startTransition] = useTransition();

  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ startTransition }),
  );

  if (totalPages <= 1) return null;

  const handleClick = (value: number) => {
    setPage(value);

    setTimeout(() => {
      refetchAction('products');
    });
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {<TransitionLoader isPending={isPending} />}
      <Button
        variant='outline'
        disabled={page <= 1 || isPending}
        onClick={() => handleClick(page - 1)}
      >
        Anterior
      </Button>

      <div className='mx-2 text-sm'>
        {page} de {totalPages}
      </div>

      <Button
        variant='outline'
        disabled={page >= totalPages || isPending}
        onClick={() => handleClick(page + 1)}
      >
        Próximo
      </Button>
    </div>
  );
}
