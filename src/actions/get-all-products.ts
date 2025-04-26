'use server';

import { unstable_cache } from 'next/cache';

import { Prisma } from '@prisma/client';

import { prisma } from '@/db/prisma';
import { CONSTANTS } from '@/utils/constants';

type GetAllProductsParams = {
  page: number;
  limit?: number;
  query?: string;
  category?: string;
  price?: number;
  rating?: number;
  sort?: string;
};

export const getAllProducts = unstable_cache(
  async ({
    page,
    limit = CONSTANTS.PAGE_SIZE,
    query,
    category,
    price,
    rating,
    sort,
  }: GetAllProductsParams) => {
    const where = {
      AND: [
        query ? { name: { contains: query, mode: 'insensitive' } } : {},
        category && category !== 'all'
          ? { category: { contains: category, mode: 'insensitive' } }
          : {},
        price ? { price: { lte: price } } : {},
        rating ? { rating: { gte: rating } } : {},
      ],
    } as Prisma.ProductWhereInput;

    const sortOptions = {
      lowest: { price: 'asc' as Prisma.SortOrder },
      highest: { price: 'desc' as Prisma.SortOrder },
      rating: { rating: 'desc' as Prisma.SortOrder },
      newest: { createdAt: 'desc' as Prisma.SortOrder },
    };

    const data = await prisma.product.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: sortOptions[sort as keyof typeof sortOptions],
    });

    const dataCount = await prisma.product.count({
      where,
    });

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
