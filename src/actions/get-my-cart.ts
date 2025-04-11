'use server';

import { cookies } from 'next/headers';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { CartItem } from '@/types/cart-item';
import { convertToPlainObject } from '@/utils/convertToPlainObject';

export const getMyCart = async () => {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;

  if (!sessionCartId) return undefined;

  const session = await auth();
  const userId = session?.user?.id;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId },
  });

  if (!cart) return undefined;

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice,
    totalPrice: cart.totalPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
  });
};
