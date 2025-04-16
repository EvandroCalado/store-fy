import { Calendar, Home, LucideIcon, PackageCheck, Users } from 'lucide-react';

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
    icon: Calendar,
  },
  {
    name: 'Usuários',
    href: '/admin/users',
    icon: Users,
  },
];
