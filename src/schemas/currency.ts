import { z } from 'zod';

import { formatNumberWithDecimal } from '@/utils/formatNumberWithDecimal';

export const currencySchema = z
  .any()
  .refine(
    value => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must be exactly 2 decimal places',
  );
