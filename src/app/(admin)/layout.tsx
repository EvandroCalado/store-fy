import { cookies } from 'next/headers';

import { AdminSideMenu } from '@/components/admin/admin-side-menu';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();

  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSideMenu />
      <main className='flex flex-1 flex-col'>
        <SidebarTrigger
          title='Abir menu lateral'
          aria-label='Abir menu lateral'
        />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
