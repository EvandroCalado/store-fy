'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { prisma } from '@/db/prisma';
import { calcPrice } from '@/utils/calcPrice';
import { formatErrors } from '@/utils/formatErrors';

import { getMyCart } from './get-my-cart';

export const removeItemFromCart = async (productId: string) => {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;

    if (!sessionCartId) throw new Error('Sessão de carrinho não encontrada');

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) throw new Error('Produto não encontrado');

    const cart = await getMyCart();

    if (!cart) throw new Error('Carrinho não encontrado');

    const existeItem = cart.items.find(item => item.productId === productId);

    if (!existeItem) throw new Error('Item não encontrado no carrinho');

    if (existeItem.quantity === 1) {
      cart.items = cart.items.filter(item => item.productId !== productId);
    } else {
      cart.items = cart.items.map(item => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      });
    }

    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: cart.items,
        ...calcPrice(cart.items),
      },
    });

    revalidatePath(`/products/${product.slug}`);

    return {
      success: true,
      message: `${product.name} removido com sucesso`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
};
