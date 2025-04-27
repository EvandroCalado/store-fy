'use server';

import { prisma } from '@/db/prisma';

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
  });

  return product;
}
