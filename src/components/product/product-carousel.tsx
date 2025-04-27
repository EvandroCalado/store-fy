'use client';

import Image from 'next/image';
import Link from 'next/link';

import AutoPlay from 'embla-carousel-autoplay';

import { Product } from '@/types/product';

import { Container } from '../shared/container';
import { LinkLoader } from '../shared/link-loader';
import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

type ProductCarouselProps = {
  featuredProducts: Product[];
};

export function ProductCarousel({ featuredProducts }: ProductCarouselProps) {
  if (featuredProducts.length <= 0) return null;

  return (
    <Container className='mt-8'>
      <Carousel
        className='w-full'
        opts={{ loop: true }}
        plugins={[
          AutoPlay({
            delay: 3000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {featuredProducts.map(product => (
            <CarouselItem key={product.id}>
              <div className='relative overflow-hidden rounded-lg'>
                <Image
                  src={product.banner || ''}
                  alt='Product banner'
                  height={0}
                  width={0}
                  sizes='100vw'
                  priority
                  className='fade-in h-[230px] w-full object-cover object-center md:h-auto'
                />

                <div className='absolute inset-0 flex flex-col justify-center gap-5 p-10'>
                  <p className='text-primary text-lg font-semibold tracking-tight'>
                    {product.category}
                  </p>

                  <div className='space-y-1 text-2xl font-semibold tracking-tighter text-black md:text-3xl xl:text-5xl'>
                    <h2>
                      Até <span className='text-primary'>40% de desconto</span>
                    </h2>
                    <h2>{product.name}</h2>
                  </div>

                  <Button
                    size='lg'
                    className='w-40 bg-white text-black hover:bg-white hover:brightness-[99.2%]'
                    asChild
                  >
                    <Link href={`/product/${product.slug}`}>
                      Comprar <LinkLoader iconName='move-right' />
                    </Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute left-2 hidden md:flex' />
        <CarouselNext className='absolute right-2 hidden md:flex' />
      </Carousel>
    </Container>
  );
}
