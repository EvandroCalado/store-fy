import { notFound, redirect } from 'next/navigation';

import Stripe from 'stripe';

import { getOrderById } from '@/actions/get-order-by-id';
import { PaymentSuccess } from '@/components/payment/payment-success';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type StripePaymentSuccessParams = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent: string }>;
};

export default async function StripePaymentSuccess({
  params,
  searchParams,
}: StripePaymentSuccessParams) {
  const { id } = await params;
  const { payment_intent } = await searchParams;

  const order = await getOrderById(id);

  if (!order) notFound();

  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order.id
  ) {
    return notFound();
  }

  const isSuccess = paymentIntent.status === 'succeeded';

  if (!isSuccess) redirect(`/order/${id}`);
  return (
    <>
      <SectionTitle title='Pagamento realizado com sucesso' />

      <Container className='my-8 flex flex-1 items-center justify-center'>
        <PaymentSuccess id={id} />
      </Container>
    </>
  );
}
