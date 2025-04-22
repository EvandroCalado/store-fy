import { Metadata } from 'next';
import Link from 'next/link';

import { getAllProducts } from '@/actions/get-all-products';
import { AdminProducts } from '@/components/admin/admin-products';
import { Container } from '@/components/shared/container';
import { LinkLoader } from '@/components/shared/link-loader';
import { Pagination } from '@/components/shared/pagination';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Administração de Produtos',
};

type AdminProductsPageParams = {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
};

const AdminProductsPage = async ({ searchParams }: AdminProductsPageParams) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const query = params.query || '';
  const category = params.category || '';

  const data = await getAllProducts({ page, query, category, limit: 12 });

  return (
    <Container className='my-8 flex flex-1 flex-col space-y-4'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-xl font-semibold'>Produtos</h1>
        <Button asChild>
          <Link href='/admin/products/create'>
            <LinkLoader iconName='Plus' />
            Criar produto
          </Link>
        </Button>
      </div>
      <AdminProducts products={data.products} />
      <Pagination
        page={page}
        totalPages={data.totalPages}
        className='ml-auto'
      />
    </Container>
  );
};

export default AdminProductsPage;
