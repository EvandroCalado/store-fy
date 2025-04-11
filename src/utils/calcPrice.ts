import { CartItem } from '@/types/cart-item';

import { roundToDecimal } from './round-to-decimal';

export const calcPrice = (items: CartItem[]) => {
  const itemsPrice = roundToDecimal(
    items.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity;
    }, 0),
  );

  const shippingPrice = roundToDecimal(itemsPrice > 100 ? 0 : 10);
  const taxPrice = roundToDecimal(0.15 * itemsPrice);
  const totalPrice = roundToDecimal(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};
