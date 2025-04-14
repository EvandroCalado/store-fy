'use server';

import { prisma } from '@/db/prisma';

export const getOrderById = async (orderId: string) => {
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
};
