'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { ArrowRight, Loader2 } from 'lucide-react';

import { Cart } from '@/types/cart';
import { formatCurrency } from '@/utils/formatCurrency';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type CartSummaryProps = {
  cart?: Cart;
};

export const CartSummary = ({ cart }: CartSummaryProps) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  if (!cart || cart.items.length === 0) return null;

  return (
    <Card className='h-fit'>
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
          {isPending ? (
            <Loader2 className='size-4 animate-spin' />
          ) : (
            <ArrowRight className='size-4' />
          )}
          Finalizar
        </Button>
      </CardContent>
    </Card>
  );
};
