import { z } from 'zod';

import { createProductSchema } from './create-product';

export const updateProductSchema = createProductSchema.extend({
  id: z.string().min(1, 'Id é obrigatório'),
});
