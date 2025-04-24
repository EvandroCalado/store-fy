import { DarkMode } from '../shared/dark-mode';
import { SidebarTrigger } from '../ui/sidebar';
import { AdminSearch } from './admin-search';

type AdminHeaderProps = {
  refetchAction: (tag: string) => Promise<void>;
};

export const AdminHeader = ({ refetchAction }: AdminHeaderProps) => {
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
};
