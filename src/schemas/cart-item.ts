import { z } from 'zod';

import { currencySchema } from './currency';

export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Produto é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  quantity: z.number().int().nonnegative('Quantidade deve ser maior que 0'),
  image: z.string().min(1, 'Imagem é obrigatória'),
  price: currencySchema,
});
