import { formatCurrency } from '@/utils/formatCurrency';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { OrderForm } from './order-form';

export type OrderSummaryProps = {
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  hasButton?: boolean;
};

export function OrderSummary({
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  hasButton = true,
}: OrderSummaryProps) {
  return (
    <Card className='gap-2 rounded-md p-5 shadow-none'>
      <CardHeader className='p-0'>
        <CardTitle>Resumo dos valores</CardTitle>
      </CardHeader>

      <CardContent className='text-muted-foreground space-y-2 p-0'>
        <div className='flex items-center justify-between'>
          <p>Subtotal</p>
          <p>{formatCurrency(itemsPrice)}</p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Taxas</p>
          <p>{formatCurrency(taxPrice)}</p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Entrega</p>
          <p>{formatCurrency(shippingPrice)}</p>
        </div>
        <div className='text-foreground flex items-center justify-between font-semibold'>
          <p>Total</p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
        {hasButton && <OrderForm />}
      </CardContent>
    </Card>
  );
}
