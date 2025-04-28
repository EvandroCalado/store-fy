'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogOut, SidebarCloseIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { adminLinks } from '@/utils/adminLinks';

import { Loader } from '../shared/loader';
import { Button } from '../ui/button';
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
  useSidebar,
} from '../ui/sidebar';

export function AdminSideMenu() {
  const { setOpenMobile } = useSidebar();
  const path = usePathname();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem
            title='Storefy'
            aria-label='Storefy'
            className='flex items-center justify-between'
          >
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

            <Button
              variant='ghost'
              size='icon'
              onClick={() => setOpenMobile(false)}
              className='rounded-full md:hidden'
            >
              <SidebarCloseIcon />
            </Button>
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
                    isActive={path === link.href}
                    tooltip={link.name}
                  >
                    <Link href={link.href} className='relative'>
                      <Loader children={<link.icon />} />
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
}
