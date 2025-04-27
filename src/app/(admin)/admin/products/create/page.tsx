import { Metadata } from 'next';

import { AdminProductsCreate } from '@/components/admin/admin-products-create';
import { Container } from '@/components/shared/container';

export const metadata: Metadata = {
  title: 'Criar produto',
};

export default async function AdminProductsCreatePage() {
  return (
    <Container className='my-8'>
      <AdminProductsCreate type='create' />
    </Container>
  );
}
