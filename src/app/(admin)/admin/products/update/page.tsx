import { Metadata } from 'next';

import { AdminProductsCreate } from '@/components/admin/admin-products-create';
import { Container } from '@/components/shared/container';

export const metadata: Metadata = {
  title: 'Criar produto',
};

const AdminProductsUpdatePage = () => {
  return (
    <Container className='my-8'>
      <AdminProductsCreate type='update' />
    </Container>
  );
};

export default AdminProductsUpdatePage;
