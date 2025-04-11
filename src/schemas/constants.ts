import { z } from 'zod';

export const ConstantsSchema = z.object({
  APP_NAME: z.string().min(3, 'App name must be at least 3 characters long'),
  APP_DESCRIPTION: z
    .string()
    .min(20, 'App description must be at least 20 characters long'),
  SERVER_URL: z.string().min(3, 'Sever URL must be at least 3 characters long'),
  LATEST_PRODUCTS_LIMIT: z
    .number()
    .nonnegative()
    .min(4, 'Latest products limit must be at least 4'),
  PAYMENT_METHODS: z.array(z.string()),
  DEFAULT_PAYMENT_METHOD: z
    .string()
    .min(3, 'Default payment method must be at least 3 characters long'),
});
