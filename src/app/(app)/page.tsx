import { notFound } from 'next/navigation';

import { getFeaturedProducts } from '@/actions/get-featured-products';
import { getLatestProducts } from '@/actions/get-latest-products';
import { ProductCarousel } from '@/components/product/product-carousel';
import { ProductGrid } from '@/components/product/product-grid';

export const metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const products = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  if (!products) notFound();

  return (
    <>
      <ProductCarousel featuredProducts={featuredProducts} />
      <ProductGrid products={products} title='Produtos Em Destaque' />
    </>
  );
}
