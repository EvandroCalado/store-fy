import { z } from 'zod';

import { paymentMethodSchema } from '@/schemas/payment-method';

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
