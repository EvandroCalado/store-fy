import { z } from 'zod';

import { insertCartSchema } from '@/schemas/insert-cart';

export type Cart = z.infer<typeof insertCartSchema>;
