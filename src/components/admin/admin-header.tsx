import { refetchAction } from '@/actions/refetch-action';

import { DarkMode } from '../shared/header/dark-mode';
import { SidebarTrigger } from '../ui/sidebar';
import { AdminSearch } from './admin-search';

export function AdminHeader() {
  return (
    <header className='flex items-center justify-between gap-4 border-b p-4'>
      <div className='flex items-center gap-4'>
        <SidebarTrigger
          title='Abir menu lateral'
          aria-label='Abir menu lateral'
          className='size-9 rounded-full'
        />
        <DarkMode />
      </div>

      <AdminSearch refetchAction={refetchAction} />
    </header>
  );
}
