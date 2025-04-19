'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';
import { formatErrors } from '@/utils/formatErrors';

export const deleteOrder = async (orderId: string) => {
  try {
    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    revalidatePath('/admin/orders');

    return {
      return: true,
      message: 'Pedido excluído com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
};
