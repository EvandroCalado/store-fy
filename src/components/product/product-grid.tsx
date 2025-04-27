import { Product } from '@/types/product';

import { Container } from '../shared/container';
import { ProductCard } from './product-card';

type ProductGridProps = {
  products: Product[];
  title?: string;
};

export function ProductGrid({ products, title }: ProductGridProps) {
  const [firstWord, ...rest] = title?.split(' ') || [];

  return (
    <Container className='space-y-4 py-8'>
      {title && (
        <h1 className='text-2xl tracking-tight sm:text-xl md:text-3xl'>
          <span className='mr-2 font-semibold'>{firstWord}</span>
          <span className='text-primary after:border-primary/10 relative font-light tracking-tighter after:absolute after:bottom-[5px] after:left-[2px] after:w-full after:border-b-6'>
            {rest.join(' ')}
          </span>
        </h1>
      )}

      {products.length > 0 && (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {products.map(product => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      )}
    </Container>
  );
}
