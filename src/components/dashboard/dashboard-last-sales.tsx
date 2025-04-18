import Link from 'next/link';

import { Order } from '@/types/order';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';

import { LinkLoader } from '../shared/link-loader';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type DashboardLastSalesProps = {
  latestSales: Omit<
    Order & { user: { name: string | null } | null },
    'shippingAddress'
  >[];
};

export const DashboardLastSales = ({
  latestSales,
}: DashboardLastSalesProps) => {
  return (
    <Card className='col-span-4 overflow-x-auto lg:col-span-3'>
      <CardHeader>
        <CardTitle>Últimas vendas</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableCaption>Lista das últimas vendas.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Comprador</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className='text-right'>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestSales.map(sale => (
              <TableRow key={sale.id}>
                <TableCell>{sale.user?.name ?? 'N/A'}</TableCell>
                <TableCell>{formatDate(sale.createdAt).dateOnly}</TableCell>
                <TableCell>{formatCurrency(sale.totalPrice)}</TableCell>
                <TableCell className='text-right'>
                  <Button size='sm' variant='outline' asChild>
                    <Link
                      href={`/order/${sale.id}`}
                      className='flex items-center gap-2'
                    >
                      <LinkLoader />
                      Detalhes
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
