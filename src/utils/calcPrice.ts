import { CartItem } from '@/types/cart-item';

import { roundToDecimal } from './round-to-decimal';

export function calcPrice(items: CartItem[]) {
  const itemsPrice = roundToDecimal(
    items.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity;
    }, 0),
  );

  const shippingPrice = roundToDecimal(itemsPrice > 100 ? 0 : 10);
  const taxPrice = roundToDecimal(0.15 * itemsPrice);
  const totalPrice = roundToDecimal(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: Number(itemsPrice.toFixed(2)),
    shippingPrice: Number(shippingPrice.toFixed(2)),
    taxPrice: Number(taxPrice.toFixed(2)),
    totalPrice: Number(totalPrice.toFixed(2)),
  };
}
