import { notFound } from 'next/navigation';

import { SearchParams } from 'nuqs';

import { getAllCategories } from '@/actions/get-all-categories';
import { getAllProducts } from '@/actions/get-all-products';
import { refetchAction } from '@/actions/refetch-action';
import { loadSearchParams } from '@/app/search-params';
import { ProductCard } from '@/components/product/product-card';
import { ProductFilterCategory } from '@/components/product/product-filter-category';
import { ProductFilterPrice } from '@/components/product/product-filter-price';
import { ProductFilterRating } from '@/components/product/product-filter-rating';
import { ProductFilterSort } from '@/components/product/product-filter-sort';
import { Container } from '@/components/shared/container';
import { Pagination } from '@/components/shared/pagination';
import { SectionTitle } from '@/components/shared/section-title';
import { formatCurrency } from '@/utils/formatCurrency';

type ProductsPageParams = {
  searchParams: Promise<SearchParams>;
};

export const generateMetadata = async ({
  searchParams,
}: ProductsPageParams) => {
  const { query, category, price, rating } =
    await loadSearchParams(searchParams);

  const queryTitle = query && `Busca: ${query}`;
  const queryCategory = category && `Categoria: ${category}`;
  const queryPrice = price === 0 ? '' : `Preço: ${formatCurrency(price)}`;
  const queryRating = rating === 0 ? '' : `Avaliação: ${rating} estrelas`;

  if (query || category || price || rating) {
    return {
      title: `${queryTitle} ${queryCategory} ${queryPrice} ${queryRating}`,
    };
  }

  return {
    title: 'Produtos',
  };
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

      <Container className='my-8 grid grid-cols-1 gap-5 sm:grid-cols-5'>
        <div className='min-w-[165px] space-y-8'>
          <ProductFilterCategory
            categories={categories}
            refetchAction={refetchAction}
          />
          <ProductFilterPrice refetchAction={refetchAction} />
          <ProductFilterRating refetchAction={refetchAction} />
        </div>

        <div className='col-span-4 flex flex-col space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground flex items-center gap-2'>
              <strong className='text-foreground text-xl'>
                {data.products.length}
              </strong>
              Produtos na Lista
            </span>

            <ProductFilterSort refetchAction={refetchAction} />
          </div>

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
