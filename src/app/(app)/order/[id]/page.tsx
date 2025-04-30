import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Stripe from 'stripe';

import { getOrderById } from '@/actions/get-order-by-id';
import { OrderDetailsAddress } from '@/components/order/order-details-address';
import { OrderDetailsPaymentMethod } from '@/components/order/order-details-payment-method';
import { OrderItems } from '@/components/order/order-items';
import { OrderPayPalPayment } from '@/components/order/order-paypal-payment';
import { OrderStripePayment } from '@/components/order/order-stripe-payment';
import { OrderSummary } from '@/components/order/order-summary';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';
import { ShippingAddress } from '@/types/shipping-address';

export const metadata: Metadata = {
  title: 'Detalhes do pedido',
};

type OrderPageParams = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: OrderPageParams) {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) notFound();

  const paypalClientId = process.env.PAYPAL_CLIENT_ID || '';

  let client_secret = null;

  if (order.paymentMethod === ' Stripe' && !order.isPaid) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(order.totalPrice) * 100,
        currency: 'BRL',
        metadata: { orderId: order.id },
        automatic_payment_methods: { enabled: true },
      });

      client_secret = paymentIntent.client_secret;
    } catch (error) {
      console.error('Erro ao criar PaymentIntent:', error);
    }
  }

  return (
    <>
      <SectionTitle title='Detalhes do pedido' />
      <Container className='my-8'>
        <div className='grid gap-5 md:grid-cols-3'>
          <h2 className='text-xl font-semibold md:col-span-3'>
            Pedido:{' '}
            <span className='text-muted-foreground text-xs'>{order.id}</span>
          </h2>

          <div className='flex flex-col gap-3 overflow-x-auto md:col-span-2'>
            <OrderDetailsPaymentMethod
              paymentMethod={order.paymentMethod}
              isPaid={order.isPaid}
              paidAt={order.paidAt}
            />
            <OrderDetailsAddress
              address={order.shippingAddress as ShippingAddress}
              isDelivered={order.isDelivered}
              deliveredAt={order.deliveredAt}
            />
            <OrderItems items={order.OrderItem} />
          </div>
          <div className='flex flex-col gap-3'>
            <OrderSummary {...order} hasButton={false} />
            <OrderPayPalPayment
              paypalClientId={paypalClientId}
              isPaid={order.isPaid}
              paymentMethod={order.paymentMethod}
              orderId={order.id}
            />
            {
              <OrderStripePayment
                totalPrice={order.totalPrice}
                orderId={order.id}
                clientSecret={client_secret || ''}
              />
            }
          </div>
        </div>
      </Container>
    </>
  );
}
