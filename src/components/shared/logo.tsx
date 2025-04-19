import Link from 'next/link';

import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href='/'
      className={cn(className)}
      title='Ir para home'
      aria-label='Ir para home'
    >
      <h1 className='text-3xl tracking-tight'>
        <span>Store</span>
        <span className='text-primary font-bold'>Fy</span>
      </h1>
    </Link>
  );
};
