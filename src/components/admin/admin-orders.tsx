import Link from 'next/link';

import { Order } from '@/types/order';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';

import { LinkLoader } from '../shared/link-loader';
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

type AdminOrdersProps = {
  orders: Omit<
    Order & { user: { name: string | null } | null },
    'shippingAddress'
  >[];
};

export const AdminOrders = ({ orders }: AdminOrdersProps) => {
  return (
    <div className='flex-1 overflow-x-auto'>
      <h2 className='text-xl font-semibold'>Pedidos</h2>

      <Table>
        <TableCaption>Lista de pedidos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
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
              <TableCell>{order.user?.name}</TableCell>
              <TableCell>{formatDate(order.createdAt).dateTime}</TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
              <TableCell>
                {order.isPaid && order.paidAt ? (
                  <p className='text-xs md:text-sm'>
                    {formatDate(order.paidAt).dateTime}
                  </p>
                ) : (
                  <p className='text-muted-foreground'>Aguardando</p>
                )}
              </TableCell>
              <TableCell>
                {order.isDelivered && order.deliveredAt ? (
                  <p>{formatDate(order.deliveredAt).dateTime}</p>
                ) : (
                  <p className='text-muted-foreground'>Aguardando</p>
                )}
              </TableCell>
              <TableCell className='text-right'>
                <Button
                  asChild
                  variant={'outline'}
                  size={'icon'}
                  title='Detalhe do pedido'
                  aria-label='Detalhe do pedido'
                >
                  <Link
                    href={`/order/${order.id}`}
                    className='flex items-center justify-center gap-1'
                  >
                    <LinkLoader iconName='Search' />
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
