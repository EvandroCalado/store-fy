'use server';

import { prisma } from '@/db/prisma';
import { formatErrors } from '@/utils/formatErrors';
import { paypal } from '@/utils/paypal';

export const createPaypalOrder = async (orderId: string) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error('Pedido não encontrada');

    const paypalOrder = await paypal.createOrder(order.totalPrice);

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        paymentResult: {
          id: paypalOrder.id,
          email_address: '',
          status: '',
          pricePaid: 0,
        },
      },
    });

    return {
      success: true,
      message: 'Pagamento realizado com sucesso',
      data: paypalOrder.id,
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
};
