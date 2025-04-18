'use server';

import { prisma } from '@/db/prisma';
import { CONSTANTS } from '@/utils/constants';

type GetAllOrderParams = {
  page: number;
  limit?: number;
};

export const getAllOrders = async ({
  page,
  limit = CONSTANTS.PAGE_SIZE,
}: GetAllOrderParams) => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  const count = await prisma.order.count();

  return {
    data: orders,
    totalPages: Math.ceil(count / limit),
  };
};
