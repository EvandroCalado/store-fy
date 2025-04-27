'use client';

import { Loader2, ShoppingBag } from 'lucide-react';

import { useCart } from '@/hooks/useCart';
import { Cart } from '@/types/cart';
import { CartItem } from '@/types/cart-item';

import { Button } from '../ui/button';
import { ProductQuantity } from './product-quantity';

type ProductAddToCartProps = {
  item: CartItem;
  cart?: Cart;
};

export function ProductAddToCart({ item, cart }: ProductAddToCartProps) {
  const { handleAddToCart, handleRemoveFromCart, isPending } = useCart();

  const existItemInCart =
    cart && cart.items.find(dbItem => dbItem.productId === item.productId);

  return existItemInCart ? (
    <ProductQuantity
      handleAddToCart={() => handleAddToCart(item)}
      handleRemoveFromCart={() => handleRemoveFromCart(item)}
      isPending={isPending}
      quantity={existItemInCart.quantity}
      className='h-9 w-[166px]'
    />
  ) : (
    <Button
      onClick={() => handleAddToCart(item)}
      disabled={isPending}
      className='w-[166px]'
    >
      {isPending ? (
        <>
          <Loader2 className='size-4 animate-spin' />
        </>
      ) : (
        <ShoppingBag />
      )}
      Adicionar
    </Button>
  );
}
