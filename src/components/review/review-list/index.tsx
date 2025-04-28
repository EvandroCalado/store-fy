'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Review } from '@/types/review';

import { ReviewForm } from '../review-form';

type ReviewListProps = {
  userId: string;
  productId: string;
  productSlug: string;
};

export function ReviewList({
  userId,
  productId,
  productSlug,
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <div className='my-4 space-y-4'>
      {/* empty */}
      {reviews.length === 0 && (
        <ReviewForm userId={userId} productId={productId} />
      )}

      {/* if logged out */}
      {userId ? (
        <div>Review</div>
      ) : (
        <div className='text-muted-foreground flex items-center justify-center'>
          Por favor
          <Link
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
            className='text-primary mx-1 hover:underline hover:underline-offset-4'
          >
            faça Login
          </Link>
          para avaliar o produto
        </div>
      )}

      {/* if logged in and has reviews */}
      {reviews.length >= 1 && <div>Reviews</div>}
    </div>
  );
}
