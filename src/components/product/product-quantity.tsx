'use client';

import { Loader2, MinusIcon, PlusIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

type ProductAddToCartProps = {
  handleAddToCart: () => void;
  handleRemoveFromCart: () => void;
  isPending: boolean;
  quantity?: number;
  className?: string;
};

export function ProductQuantity({
  handleAddToCart,
  handleRemoveFromCart,
  isPending,
  quantity = 0,
  className,
}: ProductAddToCartProps) {
  return (
    <div
      className={cn(
        'flex w-fit items-center justify-between gap-2 overflow-hidden rounded-lg border',
        className,
      )}
    >
      <Button
        variant='ghost'
        onClick={handleRemoveFromCart}
        disabled={isPending}
      >
        <MinusIcon />
      </Button>
      <div className='flex h-9 w-10 items-center justify-center'>
        {isPending ? <Loader2 className='size-4 animate-spin' /> : quantity}
      </div>
      <Button variant='ghost' onClick={handleAddToCart} disabled={isPending}>
        <PlusIcon />
      </Button>
    </div>
  );
}
