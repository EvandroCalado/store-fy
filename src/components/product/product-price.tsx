import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type ProductPriceProps = {
  value: number;
} & ComponentProps<'p'>;

export function ProductPrice({
  value,
  className,
  ...props
}: ProductPriceProps) {
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value));

  return (
    <p className={cn('font-semibold tracking-tighter', className)} {...props}>
      {formatted}
    </p>
  );
}
