'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';
import { PaymentResult } from '@/types/payment-result';
import { formatErrors } from '@/utils/formatErrors';
import { paypal } from '@/utils/paypal';

import { updateOrderToPaid } from './update-order-to-paid';

export async function approvePaypalOrder(
  orderId: string,
  data: { orderID: string },
) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error('Pedido não encontrado');

    const captureData = await paypal.capturePayment(data.orderID);

    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResult).id ||
      captureData.status !== 'COMPLETED'
    ) {
      throw new Error('Não foi possível capturar o pagamento');
    }

    await updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
        pricePaid:
          captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
      },
    });

    revalidatePath(`/order/${orderId}`);

    return {
      success: true,
      message: 'Pagamento aprovado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}
