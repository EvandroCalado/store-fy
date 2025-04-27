'use server';

import { prisma } from '@/db/prisma';

export async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
  });

  return products;
}
