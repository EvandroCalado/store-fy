'use server';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { Order } from '@/types/order';
import { ShippingAddress } from '@/types/shipping-address';
import { CONSTANTS } from '@/utils/constants';

type GetMyOrdersParams = {
  page: number;
  limit?: number;
};

export const getMyOrders = async ({
  page,
  limit = CONSTANTS.PAGE_SIZE,
}: GetMyOrdersParams) => {
  const session = await auth();

  if (!session?.user?.id) throw new Error('User not found');

  const orders = await prisma.order.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  const transformedOrders: Order[] = orders.map(order => ({
    ...order,
    shippingAddress: order.shippingAddress as ShippingAddress,
  }));

  const count = await prisma.order.count({
    where: {
      userId: session?.user?.id,
    },
  });

  return {
    orders: transformedOrders,
    totalPages: Math.ceil(count / limit),
  };
};
