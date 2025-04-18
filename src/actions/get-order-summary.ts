'use server';

import { prisma } from '@/db/prisma';

export const getOrderSummary = async () => {
  const ordersCount = await prisma.order.count();
  const productsCount = await prisma.product.count();
  const usersCount = await prisma.user.count();

  const totalSales = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
  });

  const salesDataRaw = await prisma.$queryRaw<
    Array<{ month: string; totalSales: number }>
  >`SELECT to_char("created_at", 'MM/YY') as "month", sum("total_price") as "totalSales" FROM "orders" GROUP BY to_char("created_at", 'MM/YY')`;

  const salesByMonth = salesDataRaw.map(item => ({
    month: item.month,
    totalSales: item.totalSales,
  }));

  const latestSales = await prisma.order.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    ordersCount,
    productsCount,
    usersCount,
    totalSales,
    salesByMonth,
    latestSales,
  };
};
