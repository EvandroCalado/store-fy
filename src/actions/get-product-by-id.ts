'use server';

import { prisma } from '@/db/prisma';

export async function getProductById(productId: string) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });

  return product;
}
