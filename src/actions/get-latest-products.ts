'use server';

import { prisma } from '@/db/prisma';
import { CONSTANTS } from '@/utils/constants';
import { convertToPlainObject } from '@/utils/convertToPlainObject';

export const getLatestProducts = async () => {
  const products = await prisma.product.findMany({
    take: CONSTANTS.LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return convertToPlainObject(products);
};
