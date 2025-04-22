'use server';

import { prisma } from '@/db/prisma';

export const getProductById = async (productId: string) => {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });

  return product;
};
