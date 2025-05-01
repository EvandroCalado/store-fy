import { z } from 'zod';

import { insertOrderItemSchema } from '@/schemas/insert-order-item';

export type OrderItem = z.infer<typeof insertOrderItemSchema>;
