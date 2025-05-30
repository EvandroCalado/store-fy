import { Metadata } from 'next';
import Link from 'next/link';

import { Plus } from 'lucide-react';
import { SearchParams } from 'nuqs/server';

import { getAllProducts } from '@/actions/get-all-products';
import { refetchAction } from '@/actions/refetch-action';
import { loadSearchParams } from '@/app/search-params';
import { AdminProducts } from '@/components/admin/admin-products';
import { AdminProductsCategory } from '@/components/admin/admin-products-category';
import { Container } from '@/components/shared/container';
import { GlobalLoader } from '@/components/shared/global-loader';
import { Pagination } from '@/components/shared/pagination';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Administração de Produtos',
};

type AdminProductsPageParams = {
  searchParams: Promise<SearchParams>;
};

export default async function AdminProductsPag({
  searchParams,
}: AdminProductsPageParams) {
  const { page, query, category } = await loadSearchParams(searchParams);

  const data = await getAllProducts({ page, query, category, limit: 12 });

  return (
    <Container className='my-8 flex flex-1 flex-col space-y-4'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-2'>
          <h1 className='text-xl font-semibold'>Produtos</h1>
          <AdminProductsCategory refetchAction={refetchAction} />
        </div>

        <Button asChild>
          <Link href='/admin/products/create'>
            <GlobalLoader />
            <Plus />
            Criar produto
          </Link>
        </Button>
      </div>
      <AdminProducts products={data.products} />
      <Pagination
        totalPages={data.totalPages}
        refetchAction={refetchAction}
        className='ml-auto'
      />
    </Container>
  );
}
