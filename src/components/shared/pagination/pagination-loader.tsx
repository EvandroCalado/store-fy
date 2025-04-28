'use client';

import { LoaderIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type PaginationLoaderProps = {
  isPending: boolean;
};

export function PaginationLoader({ isPending }: PaginationLoaderProps) {
  return (
    <>
      {isPending && (
        <div
          className={cn(
            'bg-background/90 fixed inset-0 z-10 flex items-center justify-center',
          )}
        >
          <div className='text-foreground flex flex-col items-center gap-2'>
            <LoaderIcon className='animate-spin' />
            <p className='text-xl font-semibold'>
              Store <span className='text-primary'>Fy</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
