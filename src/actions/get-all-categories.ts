'use server';

import { prisma } from '@/db/prisma';

export const getAllCategories = async () => {
  const categories = await prisma.product.groupBy({
    by: ['category'],
    _count: true,
  });

  return categories;
};
