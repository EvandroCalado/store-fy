import Link from 'next/link';

import { Pencil } from 'lucide-react';

import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type OrderPaymentMethodProps = {
  paymentMethod: string;
};

export const OrderPaymentMethod = ({
  paymentMethod,
}: OrderPaymentMethodProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Forma de pagamento</TableHead>
          <TableHead className='text-right'>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{paymentMethod}</TableCell>
          <TableCell className='text-right'>
            <Button
              variant='outline'
              size='icon'
              title='Editar'
              aria-label='Editar'
              asChild
            >
              <Link href='/payment-method'>
                <Pencil />
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
