'use server';

import { unstable_cache } from 'next/cache';

import { prisma } from '@/db/prisma';
import { CONSTANTS } from '@/utils/constants';

type GetAllOrderParams = {
  page: number;
  limit?: number;
  query?: string;
};

export const getAllOrders = unstable_cache(
  async ({ page, limit = CONSTANTS.PAGE_SIZE, query }: GetAllOrderParams) => {
    const orders = await prisma.order.findMany({
      where: {
        user: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const count = await prisma.order.count();

    return {
      data: orders,
      totalPages: Math.ceil(count / limit),
    };
  },
  ['orders'],
  {
    tags: ['orders'],
    revalidate: 60,
  },
);
