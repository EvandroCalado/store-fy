'use client';

import Link from 'next/link';

import confetti from 'canvas-confetti';
import { MoveRight } from 'lucide-react';

import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/ui/button';

type PaymentSuccessProps = {
  id: string;
};

export function PaymentSuccess({ id }: PaymentSuccessProps) {
  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  setTimeout(() => {
    handleClick();
  }, 500);

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
    </div>
  );
}
