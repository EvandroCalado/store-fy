import { z } from 'zod';

import { cartItemSchema } from './cart-item';
import { currencySchema } from './currency';

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currencySchema,
  totalPrice: currencySchema,
  shippingPrice: currencySchema,
  taxPrice: currencySchema,
  sessionCartId: z.string().min(1, 'Session cart id é obrigatório'),
  userId: z.string().optional().nullable(),
});
