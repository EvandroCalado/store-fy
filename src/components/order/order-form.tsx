'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { Check, Loader2 } from 'lucide-react';

import { createOrder } from '@/actions/create-order';

import { Button } from '../ui/button';

export const OrderForm = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    startTransition(async () => {
      const res = await createOrder();

      if (res.redirectTo) router.push(res.redirectTo);
    });
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? <Loader2 className='animate-spin' /> : <Check />}
        <span>Finalizar pedido</span>
      </Button>
    </form>
  );
};
