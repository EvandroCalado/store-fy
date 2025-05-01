import { Metadata } from 'next';

import { SearchParams } from 'nuqs/server';

import { getAllOrders } from '@/actions/get-all-orders';
import { refetchAction } from '@/actions/refetch-action';
import { loadSearchParams } from '@/app/search-params';
import { AdminOrders } from '@/components/admin/admin-orders';
import { Container } from '@/components/shared/container';
import { Pagination } from '@/components/shared/pagination';

export const metadata: Metadata = {
  title: 'Administração de Pedidos',
};

type AdminOrdersPageParams = {
  searchParams: Promise<SearchParams>;
};

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageParams) {
  const { page, query } = await loadSearchParams(searchParams);

  const data = await getAllOrders({ page, limit: 12, query });

  return (
    <Container className='my-8 flex flex-1 flex-col space-y-4'>
      <h1 className='text-xl font-semibold'>Pedidos</h1>

      <AdminOrders orders={data.orders} />
      <Pagination
        totalPages={data.totalPages}
        refetchAction={refetchAction}
        className='ml-auto'
      />
    </Container>
  );
}
