'use server';

import { prisma } from '@/db/prisma';
import { PaymentResult } from '@/types/payment-result';

type updateOrderToPaidParams = {
  orderId: string;
  paymentResult?: PaymentResult;
};

export async function updateOrderToPaid({
  orderId,
  paymentResult,
}: updateOrderToPaidParams) {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      OrderItem: true,
    },
  });

  if (!order) throw new Error('Pedido não encontrado');

  if (order.isPaid) throw new Error('Pedido já está pago');

  await prisma.$transaction(async transactionClient => {
    for (const item of order.OrderItem) {
      await transactionClient.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    await transactionClient.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult,
      },
    });
  });

  const updatedOrder = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      OrderItem: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!updatedOrder) throw new Error('Pedido não encontrado');
}
