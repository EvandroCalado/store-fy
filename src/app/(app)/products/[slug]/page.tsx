import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMyCart } from '@/actions/get-my-cart';
import { getProductBySlug } from '@/actions/get-product-by-slug';
import { ProductDetails } from '@/components/product/product-details';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { ProductTabs } from '@/components/product/product-tabs';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';

export const metadata: Metadata = {
  title: 'Detalhes do produto',
};

type ProductsPageParams = {
  params: Promise<{ slug: string }>;
};

const ProductsPage = async ({ params }: ProductsPageParams) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const cart = await getMyCart();

  return (
    <>
      <SectionTitle title='Detalhes do produto' />

      <Container className='my-8 grid grid-cols-1 gap-8 md:grid-cols-5 xl:grid-cols-8'>
        <ProductGallery images={product.images} />
        <ProductDetails product={product} cart={cart} />
        <ProductInfo />
        <ProductTabs details={product.details} />
      </Container>
    </>
  );
};

export default ProductsPage;
