import { Input } from '../ui/input';
import { SidebarTrigger } from '../ui/sidebar';

export const AdminHeader = () => {
  return (
    <header className='flex items-center justify-between gap-4 border-b p-4'>
      <SidebarTrigger
        title='Abir menu lateral'
        aria-label='Abir menu lateral'
      />

      <Input
        type='search'
        placeholder='Procurar produtos...'
        className='w-full max-w-sm'
      />
    </header>
  );
};
