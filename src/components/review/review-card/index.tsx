import { Calendar } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Review } from '@/types/review';
import { formatDate } from '@/utils/formatDate';
import { generateReviewStars } from '@/utils/generate-review-stars';

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className='flex gap-4'>
      <Avatar className='size-16'>
        <AvatarImage src={review.user?.image ?? undefined} />
        <AvatarFallback>{review.user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className='flex w-full flex-col gap-4'>
        <div className='flex justify-between'>
          <div>
            <p className='font-semibold'>{review.user?.name}</p>
            <p className='text-muted-foreground flex items-center gap-1 text-sm'>
              <Calendar className='size-4' />
              {formatDate(review.createdAt).dateTime}
            </p>
          </div>

          <span>{generateReviewStars(review.rating)}</span>
        </div>

        <p className='text-muted-foreground'>{review.description}</p>
      </div>
    </div>
  );
}
