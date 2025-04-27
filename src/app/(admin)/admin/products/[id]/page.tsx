import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProductById } from '@/actions/get-product-by-id';
import { AdminProductsCreate } from '@/components/admin/admin-products-create';
import { Container } from '@/components/shared/container';

export const metadata: Metadata = {
  title: 'Atualizar produto',
};

type AdminProductsUpdatePageParams = {
  params: Promise<{ id: string }>;
};

export default async function AdminProductsUpdatePage({
  params,
}: AdminProductsUpdatePageParams) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <Container className='my-8'>
      <AdminProductsCreate type='update' product={product} productId={id} />
    </Container>
  );
}
