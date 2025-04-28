'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { Check } from 'lucide-react';

import { createOrder } from '@/actions/create-order';

import { TransitionLoader } from '../shared/transition-loader';
import { Button } from '../ui/button';

export function OrderForm() {
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
    <>
      <TransitionLoader isPending={isPending} />

      <form onSubmit={handleSubmit} className='w-full'>
        <Button type='submit' className='w-full' disabled={isPending}>
          <Check />
          <span>Finalizar pedido</span>
        </Button>
      </form>
    </>
  );
}
