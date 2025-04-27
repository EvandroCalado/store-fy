'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { prisma } from '@/db/prisma';
import { createProductSchema } from '@/schemas/create-product';
import { formatErrors } from '@/utils/formatErrors';

type CreateProduct = z.infer<typeof createProductSchema>;

export async function createProduct(data: CreateProduct) {
  try {
    const product = createProductSchema.parse(data);

    await prisma.product.create({
      data: product,
    });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Produto criado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}
