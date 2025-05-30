'use server';

import { prisma } from '@/db/prisma';

export async function getAllCategories() {
  const categories = await prisma.product.groupBy({
    by: ['category'],
    _count: true,
  });

  return categories;
}
