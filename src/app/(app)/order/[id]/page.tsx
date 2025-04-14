import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getOrderById } from '@/actions/get-order-by-id';
import { OrderDetailsAddress } from '@/components/order/order-details-address';
import { OrderDetailsPaymentMethod } from '@/components/order/order-details-payment-method';
import { OrderItems } from '@/components/order/order-items';
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

const OrderPage = async ({ params }: OrderPageParams) => {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) notFound();

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
          <div>
            <OrderSummary {...order} hasButton={false} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default OrderPage;
