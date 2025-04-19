'use client';

import { useTransition } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';

import { cn } from '@/lib/utils';
import { formatUrlQuery } from '@/utils/format-url-query';

import { Button } from '../ui/button';

type PaginationProps = {
  page: number;
  totalPages: number;
  urlParams?: string;
  className?: string;
};

export const Pagination = ({
  page,
  totalPages,
  urlParams,
  className,
}: PaginationProps) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  if (totalPages <= 1) return null;

  const handleClick = (type: 'prev' | 'next') => {
    startTransition(() => {
      const pageValue = type === 'prev' ? page - 1 : page + 1;

      const newUrl = formatUrlQuery({
        params: searchParams.toString(),
        key: urlParams || 'page',
        value: pageValue.toString(),
      });

      router.push(newUrl);
    });
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant='outline'
        disabled={page <= 1 || isPending}
        onClick={() => handleClick('prev')}
      >
        {isPending ? <Loader className='animate-spin' /> : <ChevronLeft />}
        Anterior
      </Button>

      <div className='mx-2 text-sm'>
        {page} de {totalPages}
      </div>

      <Button
        variant='outline'
        disabled={page >= totalPages || isPending}
        onClick={() => handleClick('next')}
      >
        Próximo
        {isPending ? <Loader className='animate-spin' /> : <ChevronRight />}
      </Button>
    </div>
  );
};
