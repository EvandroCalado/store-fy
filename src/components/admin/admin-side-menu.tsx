'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { adminLinks } from '@/utils/adminLinks';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

export const AdminSideMenu = () => {
  const path = usePathname();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem title='Storefy' aria-label='Storefy'>
            <SidebarMenuButton
              asChild
              tooltip='Ir para home'
              aria-label='Ir para home'
            >
              <Link href='/'>
                <div className='text-primary font-bold'>FY</div>
                <span>Storefy</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>StoreFy</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {adminLinks.map(link => (
                <SidebarMenuItem key={link.name} aria-label={link.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={path.includes(link.href)}
                    tooltip={link.name}
                  >
                    <Link href={link.href}>
                      <link.icon />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className='cursor-pointer'
              aria-label='Sair'
              tooltip='Sair'
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
