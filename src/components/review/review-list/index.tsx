'use client';

import Link from 'next/link';

import { Review } from '@/types/review';

import { ReviewCard } from '../review-card';
import { ReviewForm } from '../review-form';

type ReviewListProps = {
  userId: string;
  productId: string;
  productSlug: string;
  reviewFromCurrentUser: Review | null;
  reviews: Review[];
};

export function ReviewList({
  userId,
  productId,
  productSlug,
  reviewFromCurrentUser,
  reviews,
}: ReviewListProps) {
  return (
    <div className='my-4 space-y-8'>
      {/* if logged in and has no review */}
      {userId && reviewFromCurrentUser === null && (
        <ReviewForm userId={userId} productId={productId} />
      )}

      {/* if logged in and has review */}
      {userId && reviewFromCurrentUser !== null && (
        <div className='space-y-4'>
          <h2 className='text-lg font-semibold'>Sua Avaliação</h2>

          <ReviewCard
            key={reviewFromCurrentUser.title}
            review={reviewFromCurrentUser}
          />
        </div>
      )}

      {/* if logged out */}
      {!userId && (
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

      {/* reviews */}
      {reviews.length >= 1 && (
        <div className='space-y-4'>
          <h2 className='text-lg font-semibold'>Avaliações</h2>

          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
