import { z } from 'zod';

export const constantsSchema = z.object({
  APP_NAME: z.string().min(3, 'App name must be at least 3 characters long'),
  APP_DESCRIPTION: z
    .string()
    .min(20, 'App description must be at least 20 characters long'),
  SERVER_URL: z.string().min(3, 'Sever URL must be at least 3 characters long'),
  LATEST_PRODUCTS_LIMIT: z
    .string()
    .min(1, 'Latest products limit must be at least 1')
    .transform(value => Number(value)),
  PAYMENT_METHODS: z.array(z.string().trim()),
  DEFAULT_PAYMENT_METHOD: z
    .string()
    .min(3, 'Default payment method must be at least 3 characters long'),
  PAGE_SIZE: z
    .string()
    .min(1, 'Page size must be at least 1')
    .transform(value => Number(value)),
  USER_ROLES: z.array(z.string().trim()),
  SENDER_EMAIL: z.string().email('Invalid email'),
});
