'use server';

import { prisma } from '@/db/prisma';

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
  });

  return product;
};
