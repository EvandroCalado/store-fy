import { z } from 'zod';

import { shippingAddressSchema } from '@/schemas/shipping-address';

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
