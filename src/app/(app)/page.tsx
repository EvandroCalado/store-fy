import { notFound } from 'next/navigation';

import { getLatestProducts } from '@/actions/get-latest-products';
import { ProductsGrid } from '@/components/products/products-grid';

export const metadata = {
  title: 'Home',
};

const HomePage = async () => {
  const products = await getLatestProducts();

  if (!products) notFound();

  return (
    <>
      <ProductsGrid products={products} title='Produtos Em Destaque' />
    </>
  );
};

export default HomePage;
