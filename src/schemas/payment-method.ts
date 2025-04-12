import { z } from 'zod';

import { CONSTANTS } from '@/utils/constants';

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, 'Forma de pagamento é obrigatório'),
  })
  .refine(data => CONSTANTS.PAYMENT_METHODS?.includes(data.type), {
    message: 'Forma de pagamento inválida',
    path: ['type'],
  });
