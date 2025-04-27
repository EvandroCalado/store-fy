'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { prisma } from '@/db/prisma';
import { updateUserSchema } from '@/schemas/update-user';
import { formatErrors } from '@/utils/formatErrors';

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export async function updateUser(data: UpdateUserSchema) {
  try {
    const user = updateUserSchema.parse(data);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        role: user.role,
      },
    });

    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'Usuário atualizado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}
