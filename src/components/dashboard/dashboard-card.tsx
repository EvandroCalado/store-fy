import { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type DashboardCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export const DashboardCard = ({
  title,
  value,
  icon: Icon,
}: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle>{title}</CardTitle>
        <Icon />
      </CardHeader>

      <CardContent>
        <p className='text-2xl font-bold'>{value}</p>
      </CardContent>
    </Card>
  );
};
