'use client';

import { useLinkStatus } from 'next/link';

import { Loader2, MoveLeft } from 'lucide-react';

export const LinkLoader = () => {
  const { pending } = useLinkStatus();

  return (
    <div>{pending ? <Loader2 className='animate-spin' /> : <MoveLeft />}</div>
  );
};
