import { z } from 'zod';

import { insertOrderSchema } from '@/schemas/insert-order';

export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
};
