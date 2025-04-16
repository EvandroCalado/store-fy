'use client';

import { useLinkStatus } from 'next/link';

import { Link, Loader2 } from 'lucide-react';

export const LinkLoader = () => {
  const { pending } = useLinkStatus();

  return <div>{pending ? <Loader2 className='animate-spin' /> : <Link />}</div>;
};
