'use server';

import { prisma } from '@/db/prisma';
import { convertToPlainObject } from '@/utils/convertToPlainObject';

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
  });

  return convertToPlainObject(product);
};
