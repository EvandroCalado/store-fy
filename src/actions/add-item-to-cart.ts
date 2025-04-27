'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { cartItemSchema } from '@/schemas/cart-item';
import { insertCartSchema } from '@/schemas/insert-cart';
import { CartItem } from '@/types/cart-item';
import { calcPrice } from '@/utils/calcPrice';
import { formatErrors } from '@/utils/formatErrors';

import { getMyCart } from './get-my-cart';

export async function addItemToCart(cartItem: CartItem) {
  const cookieStore = await cookies();

  try {
    const sessionCartId = cookieStore.get('sessionCartId')?.value;

    if (!sessionCartId) {
      cookieStore.set('sessionCartId', crypto.randomUUID(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    const session = await auth();
    const userId = session?.user?.id;

    const cart = await getMyCart();

    const item = cartItemSchema.parse(cartItem);

    const product = await prisma.product.findFirst({
      where: {
        id: item.productId,
      },
    });

    if (!product) throw new Error('Produto não encontrado');

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId,
        items: [item],
        sessionCartId: cookieStore.get('sessionCartId')?.value,
        ...calcPrice([item]),
      });

      await prisma.cart.create({
        data: newCart,
      });

      revalidatePath(`/products/${product.slug}`);

      return {
        success: true,
        message: 'Item adicionado ao carrinho',
      };
    }

    if (cart) {
      const existItem = cart.items.find(
        dbItem => dbItem.productId === item.productId,
      );

      if (existItem) {
        if (product.stock < existItem.quantity + 1)
          throw new Error('Sem estoque');

        const foundItem = cart.items.find(
          dbItem => dbItem.productId === item.productId,
        );

        if (foundItem) {
          foundItem.quantity = existItem.quantity + 1;
        }
      } else {
        if (product.stock < 1) throw new Error('Sem estoque');

        cart.items.push(item);
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
        message: `${product.name} ${existItem ? 'atualizado no' : 'adicionado ao'} carrinho`,
      };
    }

    return {
      success: true,
      message: 'Item adicionado ao carrinho',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}
