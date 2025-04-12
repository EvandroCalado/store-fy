import { z } from 'zod';

import { currencySchema } from './currency';

export const insertOrderItemSchema = z.object({
  productId: z.string().min(1, 'Id do Produto é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  image: z.string().min(1, 'Imagem é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  price: currencySchema,
  quantity: z.number().min(1, 'Quantidade é obrigatório'),
});
