'use server';

import { revalidatePath } from 'next/cache';

import { formatErrors } from '@/utils/formatErrors';

import { updateOrderToPaid } from './update-order-to-paid';

export const updateOrderToPaidCOD = async (orderId: string) => {
  try {
    await updateOrderToPaid({ orderId });

    revalidatePath('/admin/orders');

    return {
      success: true,
      message: 'Pedido pago com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
};
