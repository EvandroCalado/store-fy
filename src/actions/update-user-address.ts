'use server';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { shippingAddressSchema } from '@/schemas/shipping-address';
import { ShippingAddress } from '@/types/shipping-address';
import { formatErrors } from '@/utils/formatErrors';

export const updateUserAddress = async (data: ShippingAddress) => {
  try {
    const session = await auth();

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        address,
      },
    });

    return {
      success: true,
      message: 'Endereço atualizado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
};
