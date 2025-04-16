import { Metadata } from 'next';

import { getMyOrders } from '@/actions/get-my-orders';
import { OrderList } from '@/components/order/order-list';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';

export const metadata: Metadata = {
  title: 'Meus Pedidos',
};

type OrdersPageParams = {
  params: Promise<{ page: string }>;
};

const OrdersPage = async ({ params }: OrdersPageParams) => {
  const { page } = await params;

  const ordersData = await getMyOrders({ page: Number(page) || 1 });

  return (
    <>
      <SectionTitle title='Meus Pedidos' />
      <Container className='my-8'>
        <OrderList {...ordersData} />
      </Container>
    </>
  );
};

export default OrdersPage;
