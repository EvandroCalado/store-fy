import { Metadata } from 'next';

import { getMyOrders } from '@/actions/get-my-orders';
import { OrderList } from '@/components/order/order-list';
import { Container } from '@/components/shared/container';
import { Pagination } from '@/components/shared/pagination';
import { SectionTitle } from '@/components/shared/section-title';

export const metadata: Metadata = {
  title: 'Meus Pedidos',
};

type OrdersPageParams = {
  searchParams: Promise<{ page: string }>;
};

const OrdersPage = async ({ searchParams }: OrdersPageParams) => {
  const { page } = await searchParams;

  const ordersData = await getMyOrders({ page: Number(page) || 1 });

  return (
    <>
      <SectionTitle title='Meus Pedidos' />
      <Container className='my-8 flex flex-1 flex-col'>
        <OrderList orders={ordersData.orders} />
        <Pagination
          page={Number(page) || 1}
          totalPages={ordersData.totalPages}
          className='ml-auto'
        />
      </Container>
    </>
  );
};

export default OrdersPage;
