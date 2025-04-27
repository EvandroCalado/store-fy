'use server';

import { prisma } from '@/db/prisma';

export async function getOrderById(orderId: string) {
  const order = await prisma.order.findFirst({
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

  return order;
}
