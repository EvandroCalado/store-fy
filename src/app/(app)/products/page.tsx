import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SearchParams } from 'nuqs';

import { getAllCategories } from '@/actions/get-all-categories';
import { getAllProducts } from '@/actions/get-all-products';
import { refetchAction } from '@/actions/refetch-action';
import { loadSearchParams } from '@/app/search-params';
import { ProductCard } from '@/components/product/product-card';
import { ProductCategoryFilter } from '@/components/product/product-category-filter';
import { ProductPriceFilter } from '@/components/product/product-price-filter';
import { ProductRatingFilter } from '@/components/product/product-rating-filter';
import { Container } from '@/components/shared/container';
import { Pagination } from '@/components/shared/pagination';
import { SectionTitle } from '@/components/shared/section-title';

export const metadata: Metadata = {
  title: 'Produtos',
};

type ProductsPageParams = {
  searchParams: Promise<SearchParams>;
};

const ProductsPage = async ({ searchParams }: ProductsPageParams) => {
  const { page, query, category, price, rating, sort } =
    await loadSearchParams(searchParams);

  const data = await getAllProducts({
    page,
    limit: 6,
    query,
    category,
    price,
    rating,
    sort,
  });

  if (!data) return notFound();

  const categories = await getAllCategories();

  return (
    <>
      <SectionTitle title='Produtos' />

      <Container className='my-8 grid grid-cols-1 sm:grid-cols-5 md:gap-5'>
        <div className='min-w-[165px] space-y-8'>
          <ProductCategoryFilter
            categories={categories}
            refetchAction={refetchAction}
          />
          <ProductPriceFilter refetchAction={refetchAction} />
          <ProductRatingFilter refetchAction={refetchAction} />
        </div>

        <div className='col-span-4 flex flex-col'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {data.products.map(product => (
              <ProductCard product={product} key={product.slug} />
            ))}
          </div>
          <Pagination
            refetchAction={refetchAction}
            totalPages={data.totalPages}
            className='ml-auto'
          />
        </div>
      </Container>
    </>
  );
};

export default ProductsPage;
