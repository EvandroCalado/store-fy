'use client';

import { useRef } from 'react';

import Link from 'next/link';

import { MoveRight } from 'lucide-react';

import { Confetti, ConfettiRef } from '@/components/magicui/confetti';
import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/ui/button';

type PaymentSuccessProps = {
  id: string;
};

export function PaymentSuccess({ id }: PaymentSuccessProps) {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div className='flex max-w-sm flex-col items-center justify-center gap-4'>
      <h1 className='text-xl font-semibold tracking-tight md:text-2xl'>
        Obrigado por comprar conosco !
      </h1>

      <p className='text-muted-foreground'>Estamos preparando seu pedido.</p>

      <Button asChild>
        <Link href={`/order/${id}`}>
          Ver pedido
          <Loader>
            <MoveRight />
          </Loader>
        </Link>
      </Button>

      <Confetti
        ref={confettiRef}
        className='absolute top-0 left-0 -z-10 size-full'
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
    </div>
  );
}
