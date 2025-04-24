import { z } from 'zod';

import { updateProfileSchema } from './update-profile';

export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, 'Id é obrigatório'),
  role: z.string().min(1, 'Cargo é obrigatório'),
});
