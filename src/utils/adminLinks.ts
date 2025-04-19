import { Home, LucideIcon, PackageCheck, Truck, Users } from 'lucide-react';

type AdminLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export const adminLinks: AdminLink[] = [
  {
    name: 'Painel',
    href: '/admin',
    icon: Home,
  },
  {
    name: 'Produtos',
    href: '/admin/products',
    icon: PackageCheck,
  },
  {
    name: 'Pedidos',
    href: '/admin/orders',
    icon: Truck,
  },
  {
    name: 'Usuários',
    href: '/admin/users',
    icon: Users,
  },
];
