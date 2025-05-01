import Link from 'next/link';

import { Search } from 'lucide-react';

import { deleteOrder } from '@/actions/delete-order';
import { deliverOrder } from '@/actions/deliver-order';
import { updateOrderToPaidCOD } from '@/actions/update-order-to-paid-COD';
import { Order } from '@/types/order';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';

import { DeleteDialog } from '../shared/delete-dialog';
import { DeliverDialog } from '../shared/deliver-dialog';
import { UpdateDialog } from '../shared/update-dialog';
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
  orders: Omit<Order, 'shippingAddress' | 'orderItems' | 'paymentResult'>[];
};

export function AdminOrders({ orders }: AdminOrdersProps) {
  return (
    <div className='flex-1 overflow-x-auto'>
      <Table>
        <TableCaption>Lista de pedidos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Entrega</TableHead>
            <TableHead className='text-right'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id.substring(0, 6)}...</TableCell>
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
              <TableCell className='flex items-center justify-end gap-2'>
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
                    <Search />
                  </Link>
                </Button>

                <DeleteDialog
                  id={order.id}
                  action={deleteOrder}
                  isDelivered={order.isDelivered}
                />
                <UpdateDialog
                  orderId={order.id}
                  action={updateOrderToPaidCOD}
                  isPaid={order.isPaid}
                />
                <DeliverDialog
                  orderId={order.id}
                  action={deliverOrder}
                  isDelivered={order.isDelivered}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
