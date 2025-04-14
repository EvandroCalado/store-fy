import { z } from 'zod';

import { paymentResultSchema } from '@/schemas/payment-result';

export type PaymentResult = z.infer<typeof paymentResultSchema>;
