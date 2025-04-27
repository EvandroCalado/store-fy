'use server';

import { prisma } from '@/db/prisma';
import { CONSTANTS } from '@/utils/constants';

export async function getLatestProducts() {
  const products = await prisma.product.findMany({
    take: CONSTANTS.LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return products;
}
