'use server';

import { unstable_cache } from 'next/cache';

import { prisma } from '@/db/prisma';
import { CONSTANTS } from '@/utils/constants';

type GetAllProductsParams = {
  page: number;
  limit?: number;
  query?: string;
  category?: string;
};

export const getAllProducts = unstable_cache(
  async ({
    page,
    limit = CONSTANTS.PAGE_SIZE,
    query,
    category,
  }: GetAllProductsParams) => {
    const data = await prisma.product.findMany({
      where: {
        AND: [
          query ? { name: { contains: query, mode: 'insensitive' } } : {},
          category
            ? { category: { contains: category, mode: 'insensitive' } }
            : {},
        ],
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const dataCount = await prisma.product.count();

    return {
      products: data,
      totalPages: Math.ceil(dataCount / limit),
    };
  },
  ['products'],
  {
    tags: ['products'],
    revalidate: 60,
  },
);
