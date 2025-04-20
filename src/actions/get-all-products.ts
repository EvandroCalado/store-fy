'use server';

import { prisma } from '@/db/prisma';
import { CONSTANTS } from '@/utils/constants';

type GetAllProductsParams = {
  page: number;
  limit?: number;
  query: string;
  category?: string;
};

export const getAllProducts = async ({
  page,
  limit = CONSTANTS.PAGE_SIZE,
  query,
  category,
}: GetAllProductsParams) => {
  const data = await prisma.product.findMany({
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.product.count();

  return {
    products: data,
    totalPages: Math.ceil(dataCount / limit),
  };
};
