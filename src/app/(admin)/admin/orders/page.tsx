import { Metadata } from 'next';

import { getAllOrders } from '@/actions/get-all-orders';
import { AdminOrders } from '@/components/admin/admin-orders';
import { Container } from '@/components/shared/container';
import { Pagination } from '@/components/shared/pagination';

export const metadata: Metadata = {
  title: 'Administração de Pedidos',
};

type AdminOrdersPageParams = {
  searchParams: Promise<{ page: string }>;
};

const AdminOrdersPage = async ({ searchParams }: AdminOrdersPageParams) => {
  const { page = '1' } = await searchParams;

  const orders = await getAllOrders({ page: Number(page), limit: 12 });

  return (
    <Container className='my-8 flex flex-1 flex-col space-y-4'>
      <AdminOrders orders={orders.data} />
      <Pagination
        page={Number(page)}
        totalPages={orders.totalPages}
        className='ml-auto'
      />
    </Container>
  );
};

export default AdminOrdersPage;
