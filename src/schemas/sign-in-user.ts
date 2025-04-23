import { z } from 'zod';

export const signInUserSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Deve ter pelo menos 6 caracteres'),
});
