import Link from 'next/link';

import { ShoppingCartIcon } from 'lucide-react';

import { Button } from '../../ui/button';
import { GlobalLoader } from '../global-loader';

type CartButtonProps = {
  totalItems: number | undefined;
};

export function CartButton({ totalItems }: CartButtonProps) {
  return (
    <Button
      asChild
      size='icon'
      variant='ghost'
      aria-label='Carrinho de compras'
      title='Carrinho de compras'
      className='relative rounded-full'
    >
      <Link href='/cart'>
        <GlobalLoader />
        <ShoppingCartIcon />
        {!!totalItems && totalItems > 0 && (
          <span className='bg-primary absolute -top-[2px] -right-[2px] flex size-4 items-center justify-center rounded-full p-0.5 text-xs text-white'>
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
