'use server';

import { unstable_cache } from 'next/cache';

import { prisma } from '@/db/prisma';
import { CONSTANTS } from '@/utils/constants';

type GetAllUsersParams = {
  page: number;
  limit?: number;
  query?: string;
};

export const getAllUsers = unstable_cache(
  async ({ page, limit = CONSTANTS.PAGE_SIZE, query }: GetAllUsersParams) => {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
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
  },
  ['users'],
  {
    tags: ['users'],
    revalidate: 60,
  },
);
