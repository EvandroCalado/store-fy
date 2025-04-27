'use client';

import { useLinkStatus } from 'next/link';

import { LoaderIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type LoaderProps = {
  className?: string;
};

export function Loader({ className }: LoaderProps) {
  const { pending } = useLinkStatus();

  return (
    <>{pending && <LoaderIcon className={cn('animate-spin', className)} />}</>
  );
}
