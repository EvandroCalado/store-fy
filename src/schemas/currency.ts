import { formatNumberWithDecimal } from '@/utils/formatNumberWithDecimal';
import { z } from 'zod';

export const currencySchema = z
  .string()
  .refine(
    value => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must be exactly 2 decimal places',
  );
