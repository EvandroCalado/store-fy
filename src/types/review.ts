import { z } from 'zod';

import { createReviewSchema } from '@/schemas/create-review';

export type Review = z.infer<typeof createReviewSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    name: string;
    image: string | null;
  };
};
