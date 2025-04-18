import { cookies } from 'next/headers';

import { AdminHeader } from '@/components/admin/admin-header';
import { AdminSideMenu } from '@/components/admin/admin-side-menu';
import { SidebarProvider } from '@/components/ui/sidebar';

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();

  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className='flex flex-col md:flex-row'
    >
      <AdminSideMenu />
      <main className='flex flex-1 flex-col'>
        <AdminHeader />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
