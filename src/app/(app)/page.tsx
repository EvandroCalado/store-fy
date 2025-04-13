import { notFound } from 'next/navigation';

import { getLatestProducts } from '@/actions/get-latest-products';
import { ProductGrid } from '@/components/product/product-grid';

export const metadata = {
  title: 'Home',
};

const HomePage = async () => {
  const products = await getLatestProducts();

  if (!products) notFound();

  return (
    <>
      <ProductGrid products={products} title='Produtos Em Destaque' />
    </>
  );
};

export default HomePage;
