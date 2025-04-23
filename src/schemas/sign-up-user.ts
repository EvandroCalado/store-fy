import { z } from 'zod';

export const signUpUserSchema = z
  .object({
    name: z.string().min(3, 'Deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Deve ter pelo menos 6 caracteres'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  });
