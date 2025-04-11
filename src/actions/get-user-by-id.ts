'use server';

import { prisma } from '@/db/prisma';

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error('Usuário não encontrado');

  return user;
};
