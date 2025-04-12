import Link from 'next/link';

import { ShippingAddress } from '@/types/shipping-address';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type OrderAddressProps = {
  address: ShippingAddress;
};

export const OrderAddress = ({ address }: OrderAddressProps) => {
  return (
    <Card className='gap-2 p-5'>
      <CardHeader className='p-0'>
        <CardTitle>Endereço de entrega</CardTitle>
      </CardHeader>

      <CardContent className='text-muted-foreground flex items-center justify-between p-0'>
        <div>
          <p>{address.fullName}</p>
          <p>
            {address.streetAddress}, {address.city}, {address.postalCode},{' '}
            {address.country}
          </p>
        </div>

        <Button variant='outline' asChild>
          <Link href='/shipping-address'>Alterar Endereço</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
