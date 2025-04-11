import { z } from 'zod';

import { cartItemSchema } from '@/schemas/cart-item';

export type CartItem = z.infer<typeof cartItemSchema>;
