import Link from 'next/link';

import { ShoppingCartIcon } from 'lucide-react';

import { Button } from '../ui/button';

type CartButtonProps = {
  totalItems: number | undefined;
};

export const CartButton = ({ totalItems }: CartButtonProps) => {
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
        <ShoppingCartIcon />
        {!!totalItems && totalItems > 0 && (
          <span className='bg-primary absolute -top-[2px] -right-[2px] flex size-4 items-center justify-center rounded-full text-xs text-white'>
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
};
