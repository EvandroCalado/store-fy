import { z } from 'zod';

import { insertOrderItemSchema } from '@/schemas/insert-order-item';

export type OrderItem = z.infer<typeof insertOrderItemSchema> & {
  id: string;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderItem: OrderItem[];
  createdAt: Date;
  user: {
    name: string;
    email: string;
  };
};
