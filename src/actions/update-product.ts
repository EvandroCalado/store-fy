'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { prisma } from '@/db/prisma';
import { updateProductSchema } from '@/schemas/update-product';
import { formatErrors } from '@/utils/formatErrors';

type UpdateProduct = z.infer<typeof updateProductSchema>;

export const updateProduct = async (productId: string, data: UpdateProduct) => {
  try {
    const product = updateProductSchema.parse(data);

    const productExists = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!productExists) throw new Error('Product not found');

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: product,
    });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Produto atualizado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
};
