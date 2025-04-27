import Link from 'next/link';

import { Pencil } from 'lucide-react';

import { ShippingAddress } from '@/types/shipping-address';

import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type OrderAddressProps = {
  address: ShippingAddress;
};

export function OrderAddress({ address }: OrderAddressProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome Completo</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead className='text-right'>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{address.fullName}</TableCell>
          <TableCell>
            {address.streetAddress}, {address.city}, {address.postalCode},{' '}
            {address.country}
          </TableCell>
          <TableCell className='text-right'>
            <Button
              variant='outline'
              size='icon'
              title='Editar'
              aria-label='Editar'
              asChild
            >
              <Link href='/shipping-address'>
                <Pencil />
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
