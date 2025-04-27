'use server';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { paymentMethodSchema } from '@/schemas/payment-method';
import { PaymentMethod } from '@/types/payment-method';
import { formatErrors } from '@/utils/formatErrors';

export async function updateUserPaymentMethod(data: PaymentMethod) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error('Usuário não encontrado');

    const paymentMethod = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        paymentMethod: paymentMethod.type,
      },
    });

    return {
      success: true,
      message: 'Método de pagamento atualizado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}
