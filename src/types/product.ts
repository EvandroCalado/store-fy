import { z } from 'zod';

import { createProductSchema } from '@/schemas/create-product';

export type Product = z.infer<typeof createProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
};
