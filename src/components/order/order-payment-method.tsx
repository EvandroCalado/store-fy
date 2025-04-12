import Link from 'next/link';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type OrderPaymentMethodProps = {
  paymentMethod: string;
};

export const OrderPaymentMethod = ({
  paymentMethod,
}: OrderPaymentMethodProps) => {
  return (
    <Card className='gap-2 p-5'>
      <CardHeader className='p-0'>
        <CardTitle>Forma de pagamento</CardTitle>
      </CardHeader>

      <CardContent className='text-muted-foreground flex items-center justify-between p-0'>
        <p>{paymentMethod}</p>

        <Button variant='outline' asChild>
          <Link href='/payment-method'>Alterar Pagamento</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
