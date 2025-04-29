'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { createReviewSchema } from '@/schemas/create-review';
import { formatErrors } from '@/utils/formatErrors';

type ReviewForm = z.infer<typeof createReviewSchema>;

export async function createReview(data: ReviewForm) {
  try {
    const session = await auth();

    if (!session) throw new Error('Unauthorized');

    const review = createReviewSchema.parse({
      ...data,
      userId: session.user.id,
    });

    const product = await prisma.product.findFirst({
      where: {
        id: review.productId,
      },
    });

    if (!product) throw new Error('Product not found');

    const reviewExists = await prisma.review.findFirst({
      where: {
        userId: review.userId,
        productId: review.productId,
      },
    });

    const existisProductInOrders = await prisma.order.findFirst({
      where: {
        userId: review.userId,
        OrderItem: {
          some: {
            productId: review.productId,
          },
        },
      },
    });

    if (!existisProductInOrders) {
      return {
        success: false,
        message: 'Você não pode avaliar um produto que não comprou',
      };
    }

    await prisma.$transaction(async tx => {
      if (reviewExists) {
        await tx.review.update({
          where: {
            id: reviewExists.id,
          },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        });
      } else {
        await tx.review.create({
          data: review,
        });
      }

      const averageRating = await tx.review.aggregate({
        _avg: {
          rating: true,
        },
        where: {
          productId: review.productId,
        },
      });

      const numReviews = await tx.review.count({
        where: {
          productId: review.productId,
        },
      });

      await tx.product.update({
        where: {
          id: review.productId,
        },
        data: {
          rating: averageRating._avg.rating ?? 0,
          numReviews: numReviews,
        },
      });
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: 'Avaliado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      error: formatErrors(error),
    };
  }
}
