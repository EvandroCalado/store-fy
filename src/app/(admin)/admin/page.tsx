import { Metadata } from 'next';

import { BadgeDollarSign, Barcode, CreditCard, Users2 } from 'lucide-react';

import { getOrderSummary } from '@/actions/get-order-summary';
import { auth } from '@/auth';
import { DashboardCard } from '@/components/dashboard/dashboard-card';
import { DashboardChart } from '@/components/dashboard/dashboard-chart';
import { DashboardLastSales } from '@/components/dashboard/dashboard-last-sales';
import { Container } from '@/components/shared/container';
import { formatCurrency } from '@/utils/formatCurrency';

export const metadata: Metadata = {
  title: 'Administração Painel',
};

const AdminPage = async () => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    throw new Error('Acesso negado');
  }

  const summary = await getOrderSummary();

  return (
    <Container className='space-y-4 p-4'>
      <h2 className='text-xl font-semibold md:col-span-3'>Painel</h2>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <DashboardCard
          title='Receita total'
          value={formatCurrency(summary.totalSales._sum.totalPrice || 0)}
          icon={BadgeDollarSign}
        />
        <DashboardCard
          title='Vendas'
          value={summary.ordersCount.toString() || '0'}
          icon={CreditCard}
        />
        <DashboardCard
          title='Clientes'
          value={summary.usersCount.toString() || '0'}
          icon={Users2}
        />
        <DashboardCard
          title='Produtos'
          value={summary.productsCount.toString() || '0'}
          icon={Barcode}
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <DashboardChart salesByMonth={summary.salesByMonth} />
        <DashboardLastSales latestSales={summary.latestSales} />
      </div>
    </Container>
  );
};

export default AdminPage;
