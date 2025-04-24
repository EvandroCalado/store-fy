'use server';

import { prisma } from '@/db/prisma';
import { CONSTANTS } from '@/utils/constants';

type GetAllUsersParams = {
  page: number;
  limit?: number;
};

export const getAllUsers = async ({
  page,
  limit = CONSTANTS.PAGE_SIZE,
}: GetAllUsersParams) => {
  const users = await prisma.user.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const count = await prisma.user.count();

  return {
    users: users,
    totalPages: Math.ceil(count / limit),
  };
};
