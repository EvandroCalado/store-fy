import { ShippingAddress } from '@/types/shipping-address';
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

type OrderDetailsAddressProps = {
  address: ShippingAddress;
  isDelivered: boolean;
  deliveredAt: Date | null;
};

export const OrderDetailsAddress = ({
  address,
  isDelivered,
  deliveredAt,
}: OrderDetailsAddressProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome Completo</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead className='text-right'>Status da entrega</TableHead>
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
            {isDelivered ? (
              <Badge variant='secondary'>
                Entregue em {deliveredAt && formatDate(deliveredAt).dateTime}
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
