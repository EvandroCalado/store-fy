import { z } from 'zod';

import { insertOrderSchema } from '@/schemas/insert-order';

import { OrderItem } from './order-item';
import { PaymentResult } from './payment-result';

export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  createdAt: Date;
  orderItems: OrderItem[];
  user: { name: string; email: string };
  paymentResult: PaymentResult;
};
