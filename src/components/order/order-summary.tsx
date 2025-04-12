import { Cart } from '@/types/cart';
import { formatCurrency } from '@/utils/formatCurrency';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export type OrderSummaryProps = {
  cart: Cart;
};

export const OrderSummary = ({ cart }: OrderSummaryProps) => {
  return (
    <Card className='gap-2 p-5'>
      <CardHeader className='p-0'>
        <CardTitle>Resumo da compra</CardTitle>
      </CardHeader>

      <CardContent className='text-muted-foreground p-0'>
        <div className='flex items-center justify-between'>
          <p>Subtotal</p>
          <p>{formatCurrency(cart.itemsPrice)}</p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Taxas</p>
          <p>{formatCurrency(cart.taxPrice)}</p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Entrega</p>
          <p>{formatCurrency(cart.shippingPrice)}</p>
        </div>
        <div className='text-foreground flex items-center justify-between font-semibold'>
          <p>Total</p>
          <p>{formatCurrency(cart.totalPrice)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
