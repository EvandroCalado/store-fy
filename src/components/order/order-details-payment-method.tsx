import { formatDate } from '@/utils/formatDate';

import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type OrderDetailsPaymentMethodProps = {
  paymentMethod: string;
  isPaid: boolean;
  paidAt: Date | null;
};

export const OrderDetailsPaymentMethod = ({
  paymentMethod,
  isPaid,
  paidAt,
}: OrderDetailsPaymentMethodProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Forma de pagamento</TableHead>
          <TableHead className='text-right'>Status do pagamento</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{paymentMethod}</TableCell>
          <TableCell className='text-right'>
            {isPaid ? (
              <Badge variant='secondary'>
                Pago em {paidAt && formatDate(paidAt).dateTime}
              </Badge>
            ) : (
              <Badge variant='destructive'>Aguardando pagamento</Badge>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
