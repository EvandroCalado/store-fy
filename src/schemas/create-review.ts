import { z } from 'zod';

export const createReviewSchema = z.object({
  userId: z.string().min(1, 'Usuário é obrigatório'),
  productId: z.string().min(1, 'Produto é obrigatório'),
  rating: z.coerce
    .number()
    .int()
    .min(1, 'Avaliação deve ser entre 1 e 5')
    .max(5, 'Avaliação deve ser entre 1 e 5'),
  title: z.string().min(3, 'Título deve conter pelo menos 3 caracteres'),
  description: z
    .string()
    .min(10, 'Descrição deve conter pelo menos 10 caracteres'),
  isVerifiedPurchase: z.boolean().optional(),
});
