import { HeartIcon } from 'lucide-react';

import { Cart } from '@/types/cart';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { generateReviewStars } from '@/utils/generate-review-stars';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ProductAddToCart } from './product-add-to-cart';

type ProductPageProps = {
  product: Product;
  cart?: Cart;
};

export const ProductDetails = ({ product, cart }: ProductPageProps) => {
  return (
    <div className='space-y-8 md:col-span-3'>
      <div className='flex items-center gap-4'>
        <Badge className='bg-red-100 font-semibold text-red-500 capitalize'>
          {product.category}
        </Badge>

        <div className='flex items-center gap-2'>
          <p>{generateReviewStars(Number(product.rating))}</p>
          <p className='text-muted-foreground'>
            {product.numReviews} Avaliações
          </p>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <h1 className='text-3xl font-semibold tracking-tight capitalize'>
          {product.name}
        </h1>
        <Badge variant={'outline'} className='font-semibold text-red-500'>
          {product.stock > 0 ? 'Em estoque' : 'Sem estoque'}
        </Badge>
      </div>

      <p className='text-primary text-4xl font-bold tracking-tighter'>
        {formatCurrency(Number(product.price))}
      </p>

      <p className='text-muted-foreground'>{product.description}</p>

      {product.stock > 0 && (
        <div className='flex items-center gap-4'>
          <ProductAddToCart
            item={{
              productId: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              quantity: 1,
              image: product.images[0],
            }}
            cart={cart}
          />

          <Button variant='outline' size={'icon'}>
            <HeartIcon />
          </Button>
        </div>
      )}

      <div className='flex items-center gap-2'>
        <p className='font-semibold'>Marca:</p>
        <p className='text-muted-foreground capitalize'>{product.brand}</p>
      </div>
    </div>
  );
};
