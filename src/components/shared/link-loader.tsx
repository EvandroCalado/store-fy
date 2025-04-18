'use client';

import { useLinkStatus } from 'next/link';

import { Link, Loader2 } from 'lucide-react';

export const LinkLoader = () => {
  const { pending } = useLinkStatus();

  return (
    <div className='flex items-center justify-center'>
      {pending ? (
        <Loader2 className='size-3 animate-spin' />
      ) : (
        <Link className='size-3' />
      )}
    </div>
  );
};
