'use client';

import { useLinkStatus } from 'next/link';

import { LoaderIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type LoaderProps = {
  children?: React.ReactNode;
  className?: string;
};

export function Loader({ children, className }: LoaderProps) {
  const { pending } = useLinkStatus();

  if (children) {
    return (
      <>
        {pending ? (
          <LoaderIcon className={cn('animate-spin', className)} />
        ) : (
          children
        )}
      </>
    );
  }

  return (
    <>{pending && <LoaderIcon className={cn('animate-spin', className)} />}</>
  );
}
