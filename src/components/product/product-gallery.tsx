'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Product } from '@/types/product';

type ProductPageProps = {
  images: Product['images'];
};

export function ProductGallery({ images }: ProductPageProps) {
  const [displayImage, setDisplayImage] = useState(images[0]);

  return (
    <div className='md:col-span-5 xl:col-span-3'>
      <div className='flex flex-col-reverse gap-2 sm:flex-row'>
        <div className='flex w-24 flex-row gap-4 sm:flex-col'>
          {images.map(image => (
            <Image
              key={image}
              src={image}
              alt='Product image'
              width={500}
              height={500}
              priority
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='h-20 w-20 cursor-pointer rounded-lg object-cover'
              onClick={() => setDisplayImage(image)}
            />
          ))}
        </div>
        <Image
          src={displayImage}
          alt='Product image'
          width={500}
          height={500}
          priority
          className='mx-auto h-[400px] w-full rounded-lg object-cover md:w-[500px] xl:w-[345px]'
        />
      </div>
    </div>
  );
}
