'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/types/product';
import { generateReviewStars } from '@/utils/generate-review-stars';

import { GlobalLoader } from '../shared/global-loader';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ProductPrice } from './product-price';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [displayImage, setIsDisplayImage] = useState(product.images[0]);

  return (
    <Card
      key={product.slug}
      className='animate-fade-in bg-background min-w-[320px] border-none shadow-none transition-all duration-150'
    >
      <Link href={`/product/${product.slug}`}>
        <GlobalLoader />

        <CardHeader>
          <Image
            src={displayImage}
            alt={product.name}
            width={300}
            height={300}
            priority
            className='bg-muted h-[280px] rounded-lg object-cover'
            onMouseEnter={() => setIsDisplayImage(product.images[1])}
            onMouseLeave={() => setIsDisplayImage(product.images[0])}
          />
        </CardHeader>
        <CardContent className='space-y-2'>
          <h2 className='text-muted-foreground text-[15px] font-normal capitalize'>
            {product.name}
          </h2>

          <div className='flex items-center justify-between'>
            {product.stock > 0 && <ProductPrice value={product.price} />}

            {product.stock <= 0 && (
              <Badge
                variant='outline'
                className='text-xs font-semibold text-red-500'
              >
                Sem estoque
              </Badge>
            )}

            <p className='text-xs tracking-tight'>
              {product.rating.toFixed(1)}
              {generateReviewStars(Number(product.rating))}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
