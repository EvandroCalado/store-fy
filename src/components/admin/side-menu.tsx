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

export const SideMenu = () => {
  const path = usePathname();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem title='Storefy' aria-label='Storefy'>
            <SidebarMenuButton asChild>
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
                <SidebarMenuItem
                  key={link.name}
                  title={link.name}
                  aria-label={link.name}
                >
                  <SidebarMenuButton
                    asChild
                    isActive={path.includes(link.href)}
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
          <SidebarMenuItem title='Sair' aria-label='Sair'>
            <SidebarMenuButton
              className='cursor-pointer'
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
