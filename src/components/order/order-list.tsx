import Link from 'next/link';

import { Order } from '@/types/order';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';

import { LinkLoader } from '../shared/link-loader';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type OrderListProps = {
  orders: Order[];
};

export const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className='flex-1 overflow-x-auto'>
      <h2 className='text-xl font-semibold'>Pedidos</h2>

      <Table>
        <TableCaption>Lista de pedidos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Entrega</TableHead>
            <TableHead className='text-right'>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{formatDate(order.createdAt).dateTime}</TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
              <TableCell>
                {order.isPaid && order.paidAt ? (
                  <Badge variant='secondary' className='w-44'>
                    {formatDate(order.paidAt).dateTime}
                  </Badge>
                ) : (
                  <Badge variant='destructive' className='w-44'>
                    Aguardando pagamento
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {order.isDelivered && order.deliveredAt ? (
                  <Badge variant='secondary' className='w-44'>
                    {formatDate(order.deliveredAt).dateTime}
                  </Badge>
                ) : (
                  <Badge variant='destructive' className='w-44'>
                    Aguardando entrega
                  </Badge>
                )}
              </TableCell>
              <TableCell className='text-right'>
                <Button asChild variant='outline' size='sm'>
                  <Link
                    href={`/order/${order.id}`}
                    className='flex items-center gap-2'
                  >
                    Detalhes
                    <LinkLoader iconName='MoveRight' />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
