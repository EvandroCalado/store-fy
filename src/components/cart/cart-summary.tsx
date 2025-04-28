'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { MoveRight } from 'lucide-react';

import { Cart } from '@/types/cart';
import { formatCurrency } from '@/utils/formatCurrency';

import { TransitionLoader } from '../shared/transition-loader';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type CartSummaryProps = {
  cart?: Cart;
};

export function CartSummary({ cart }: CartSummaryProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  if (!cart || cart.items.length === 0) return null;

  return (
    <Card className='h-fit'>
      <TransitionLoader isPending={isPending} />

      <CardHeader>
        <CardTitle>Resumo do pedido</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <div className='flex items-center justify-between text-sm'>
          <p>Quantidade: </p>
          <p>{cart?.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <p>Total: </p>
          <p className='font-semibold tracking-tighter'>
            {formatCurrency(cart?.totalPrice)}
          </p>
        </div>

        <Button
          className='mt-6 w-full'
          disabled={isPending}
          onClick={() => {
            startTransition(() => router.push('/shipping-address'));
          }}
        >
          Finalizar
          <MoveRight className='size-4' />
        </Button>
      </CardContent>
    </Card>
  );
}
