import { z } from 'zod';

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  streetAddress: z.string().min(3, 'Endereço deve ter pelo menos 3 caracteres'),
  city: z.string().min(3, 'Cidade deve ter pelo menos 3 caracteres'),
  postalCode: z.string().min(3, 'CEP deve ter pelo menos 3 caracteres'),
  country: z.string().min(3, 'País deve ter pelo menos 3 caracteres'),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
