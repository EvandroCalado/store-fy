import { z } from 'zod';

import { insertOrderSchema } from '@/schemas/insert-order';

export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  createdAt: Date;
};
