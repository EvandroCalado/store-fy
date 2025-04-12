import { z } from 'zod';

import { CONSTANTS } from '@/utils/constants';

import { currencySchema } from './currency';
import { shippingAddressSchema } from './shipping-address';

export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'Usuário é obrigatório'),
  itemsPrice: currencySchema,
  shippingPrice: currencySchema,
  taxPrice: currencySchema,
  totalPrice: currencySchema,
  paymentMethod: z
    .string()
    .refine(data => CONSTANTS.PAYMENT_METHODS.includes(data), {
      message: 'Forma de pagamento inválida',
      path: ['paymentMethod'],
    }),
  shippingAddress: shippingAddressSchema,
});
