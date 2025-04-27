'use client';

import { useMemo } from 'react';

import { Label, Pie, PieChart } from 'recharts';

import { formatCurrency } from '@/utils/formatCurrency';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';

type DashboardChartProps = {
  salesByMonth: {
    month: string;
    totalSales: number;
  }[];
};

const colors = [
  '#00b88c',
  '#ef8e41',
  '#065cd3',
  '#eb376f',
  '#b450d6',
  '#ff79cb',
];

export function DashboardChart({ salesByMonth }: DashboardChartProps) {
  const chartData = salesByMonth.map((item, index) => ({
    month: item.month,
    totalSales: item.totalSales,
    fill: colors[index],
  }));

  const chartConfig = {
    totalSales: {
      label: 'Vendas Totais',
    },
    '11/24': {
      label: 'Novembro',
    },
    '12/24': {
      label: 'Dezembro',
    },
    '01/25': {
      label: 'Janeiro',
    },
    '02/25': {
      label: 'Fevereiro',
    },
    '03/25': {
      label: 'Março',
    },
    '04/25': {
      label: 'Abril',
    },
  } satisfies ChartConfig;

  const totalSales = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totalSales, 0);
  }, [chartData]);

  return (
    <Card className='col-span-4 flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Gráfico de vendas por mês</CardTitle>
        <CardDescription>Últimos 12 meses</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[320px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='totalSales'
              nameKey='month'
              innerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground font-bold md:text-xl'
                        >
                          {formatCurrency(totalSales)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Vendas Totais
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
