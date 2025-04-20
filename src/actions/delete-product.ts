'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';
import { formatErrors } from '@/utils/formatErrors';

export const deleteProduct = async (productId: string) => {
  try {
    const productExists = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!productExists) throw new Error('Product not found');

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Produto deletado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
};
