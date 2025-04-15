'use server';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
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

  const data = await prisma.order.findMany({
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
    data,
    totalPages: Math.ceil(count / limit),
  };
};
