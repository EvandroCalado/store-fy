import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type ProductsPriceProps = {
  value: string;
} & ComponentProps<'p'>;

export const ProductsPrice = ({
  value,
  className,
  ...props
}: ProductsPriceProps) => {
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value));

  return (
    <p className={cn('font-semibold tracking-tighter', className)} {...props}>
      {formatted}
    </p>
  );
};
