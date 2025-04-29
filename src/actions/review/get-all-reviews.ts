'use server';

import { prisma } from '@/db/prisma';
import { CONSTANTS } from '@/utils/constants';

type GetAllReviewsParams = {
  productId: string;
  page: number;
  limit: number;
};

export async function getAllReviews({
  page,
  limit = CONSTANTS.PAGE_SIZE,
  productId,
}: GetAllReviewsParams) {
  const reviews = await prisma.review.findMany({
    where: { productId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const count = await prisma.review.count({
    where: { productId },
  });

  return {
    reviews,
    totalPages: Math.ceil(count / limit),
  };
}
