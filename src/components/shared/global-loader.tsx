'use client';

import { useLinkStatus } from 'next/link';

import { LoaderIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export function GlobalLoader() {
  const { pending } = useLinkStatus();

  return (
    <div
      className={cn('absolute inset-0 -z-10 flex items-center justify-center', {
        'bg-background/80 z-10': pending,
      })}
    >
      {pending && (
        <div className='text-foreground flex flex-col items-center gap-2'>
          <LoaderIcon className='animate-spin' />
          <p className='text-xl font-semibold'>
            Store <span className='text-primary'>Fy</span>
          </p>
        </div>
      )}
    </div>
  );
}
