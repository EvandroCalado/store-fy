'use server';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { updateProfileSchema } from '@/schemas/update-profile';
import { formatErrors } from '@/utils/formatErrors';

type updateProfileParams = {
  name: string;
  email: string;
};

export async function updateProfile({ name, email }: updateProfileParams) {
  try {
    const session = await auth();

    const parsedUser = updateProfileSchema.parse({
      name,
      email,
    });

    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error('Usuário não encontrado');

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: parsedUser.name,
        email: parsedUser.email,
      },
    });

    return {
      success: true,
      message: 'Perfil atualizado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}
