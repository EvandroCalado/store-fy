import { z } from 'zod';

import { formatNumberWithDecimal } from '@/utils/formatNumberWithDecimal';

export const currencySchema = z.coerce
  .number()
  .refine(
    value => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
    'Price must be exactly 2 decimal places',
  );
