'use server';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';

export async function getReviewByUser(productId: string) {
  const session = await auth();

  if (!session) return null;

  const review = await prisma.review.findFirst({
    where: {
      userId: session.user.id,
      productId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return review;
}
