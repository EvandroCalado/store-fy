import { Metadata } from 'next';

import { SearchParams } from 'nuqs/server';

import { getAllOrders } from '@/actions/get-all-orders';
import { AdminOrders } from '@/components/admin/admin-orders';
import { Container } from '@/components/shared/container';
import { Pagination } from '@/components/shared/pagination';

import { loadSearchParams } from '../../search-params';

export const metadata: Metadata = {
  title: 'Administração de Pedidos',
};

type AdminOrdersPageParams = {
  searchParams: Promise<SearchParams>;
};

const AdminOrdersPage = async ({ searchParams }: AdminOrdersPageParams) => {
  const { page, query } = await loadSearchParams(searchParams);

  const orders = await getAllOrders({ page, limit: 12, query });

  return (
    <Container className='my-8 flex flex-1 flex-col space-y-4'>
      <h1 className='text-xl font-semibold'>Pedidos</h1>

      <AdminOrders orders={orders.data} />
      <Pagination
        page={page}
        totalPages={orders.totalPages}
        className='ml-auto'
      />
    </Container>
  );
};

export default AdminOrdersPage;
