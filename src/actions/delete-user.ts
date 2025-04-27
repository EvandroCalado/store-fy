'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';
import { formatErrors } from '@/utils/formatErrors';

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'Usuário deletado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}
