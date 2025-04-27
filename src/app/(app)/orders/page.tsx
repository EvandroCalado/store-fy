import { Metadata } from 'next';

import { SearchParams } from 'nuqs';

import { getMyOrders } from '@/actions/get-my-orders';
import { refetchAction } from '@/actions/refetch-action';
import { loadSearchParams } from '@/app/search-params';
import { OrderList } from '@/components/order/order-list';
import { Container } from '@/components/shared/container';
import { Pagination } from '@/components/shared/pagination';
import { SectionTitle } from '@/components/shared/section-title';

export const metadata: Metadata = {
  title: 'Meus Pedidos',
};

type OrdersPageParams = {
  searchParams: Promise<SearchParams>;
};

export default async function OrdersPage({ searchParams }: OrdersPageParams) {
  const { page } = await loadSearchParams(searchParams);

  const ordersData = await getMyOrders({ page });

  return (
    <>
      <SectionTitle title='Meus Pedidos' />
      <Container className='my-8 flex flex-1 flex-col'>
        <OrderList orders={ordersData.orders} />
        <Pagination
          totalPages={ordersData.totalPages}
          refetchAction={refetchAction}
          className='ml-auto'
        />
      </Container>
    </>
  );
}
