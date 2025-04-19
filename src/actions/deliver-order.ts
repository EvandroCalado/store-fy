'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';
import { formatErrors } from '@/utils/formatErrors';

export const deliverOrder = async (orderId: string) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error('Pedido não encontrado');

    if (!order.isPaid) throw new Error('Pedido ainda não foi pago');

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
      },
    });

    revalidatePath('/admin/orders');

    return {
      success: true,
      message: 'Pedido entregue com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
};
