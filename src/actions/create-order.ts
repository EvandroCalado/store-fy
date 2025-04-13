'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { insertOrderSchema } from '@/schemas/insert-order';
import { CartItem } from '@/types/cart-item';
import { formatErrors } from '@/utils/formatErrors';

import { getMyCart } from './get-my-cart';
import { getUserById } from './get-user-by-id';

export const createOrder = async () => {
  try {
    const session = await auth();

    if (!session) throw new Error('Usuário não autenticado');

    const userId = session?.user?.id;

    if (!userId) throw new Error('Usuário não encontrado');

    const user = await getUserById(userId);

    const cart = await getMyCart();

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: 'Carrinho de compras vazio',
        redirectTo: '/cart',
      };
    }

    if (!user.address) {
      return {
        success: false,
        message: 'Endereço de entrega não informado',
        redirectTo: '/shipping-address',
      };
    }

    if (!user.paymentMethod) {
      return {
        success: false,
        message: 'Método de pagamento não informado',
        redirectTo: '/payment-method',
      };
    }

    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    const insertedOrderId = await prisma.$transaction(
      async transactionClient => {
        const insertedOrder = await transactionClient.order.create({
          data: order,
        });

        for (const item of cart.items as CartItem[]) {
          await transactionClient.orderItem.create({
            data: {
              ...item,
              price: item.price,
              orderId: insertedOrder.id,
            },
          });
        }

        // Clear cart
        await transactionClient.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            items: [],
            itemsPrice: 0,
            totalPrice: 0,
            shippingPrice: 0,
            taxPrice: 0,
          },
        });

        return insertedOrder.id;
      },
    );

    if (!insertedOrderId) throw new Error('Erro ao criar pedido');

    return {
      success: true,
      message: 'Pedido criado com sucesso',
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      console.log(error);
      throw error;
    }

    return {
      success: false,
      message: formatErrors(error),
    };
  }
};
