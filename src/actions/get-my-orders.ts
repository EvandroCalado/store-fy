'use server';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { CONSTANTS } from '@/utils/constants';

type GetMyOrdersParams = {
  page: number;
  limit?: number;
};

export async function getMyOrders({
  page,
  limit = CONSTANTS.PAGE_SIZE,
}: GetMyOrdersParams) {
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

  const count = await prisma.order.count({
    where: {
      userId: session?.user?.id,
    },
  });

  return {
    orders,
    totalPages: Math.ceil(count / limit),
  };
}
