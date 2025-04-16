'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const searchParams = useSearchParams();
  const router = useRouter();

  if (totalPages <= 1) return null;

  const handleClick = (type: 'prev' | 'next') => {
    const pageValue = type === 'prev' ? page - 1 : page + 1;

    const newUrl = formatUrlQuery({
      params: searchParams.toString(),
      key: urlParams || 'page',
      value: pageValue.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        size='icon'
        variant='outline'
        disabled={page <= 1}
        onClick={() => handleClick('prev')}
      >
        <ChevronLeft />
      </Button>

      <div className='mx-2 text-sm'>
        {page} de {totalPages}
      </div>

      <Button
        size='icon'
        variant='outline'
        disabled={page >= totalPages}
        onClick={() => handleClick('next')}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};
