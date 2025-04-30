'use client';

import { FormEvent, useState } from 'react';

import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { CONSTANTS } from '@/utils/constants';
import { formatCurrency } from '@/utils/formatCurrency';

type OrderStripePaymentProps = {
  totalPrice: number;
  orderId: string;
  clientSecret: string;
};

export function OrderStripePayment({
  totalPrice,
  orderId,
  clientSecret,
}: OrderStripePaymentProps) {
  if (!clientSecret) return null;

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  );

  const { theme } = useTheme();

  function StripeForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    async function handleSubmit(e: FormEvent) {
      e.preventDefault();

      if (!stripe || !elements || !email) return;

      setIsLoading(true);

      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${CONSTANTS.SERVER_URL}/order/${orderId}/stripe-payment-success`,
          },
        })
        .then(({ error }) => {
          if (
            error?.type === 'card_error' ||
            error?.type === 'validation_error'
          ) {
            setErrorMessage(error?.message ?? 'Um erro desconhecido ocorreu.');
          } else {
            setErrorMessage('Um erro desconhecido ocorreu.');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return (
      <form className='space-y-4' onSubmit={handleSubmit}>
        {errorMessage && (
          <p className='text-destructive text-sm'>{errorMessage}</p>
        )}

        <PaymentElement />

        <div>
          <LinkAuthenticationElement onChange={e => setEmail(e.value.email)} />
        </div>

        <Button
          className='w-full'
          size={'lg'}
          disabled={stripe === null || elements === null || isLoading}
        >
          {isLoading ? 'Carregando...' : `Pagar ${formatCurrency(totalPrice)}`}
        </Button>
      </form>
    );
  }

  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: theme === 'dark' ? 'night' : 'stripe',
        },
      }}
      stripe={stripePromise}
    >
      <StripeForm />
    </Elements>
  );
}
