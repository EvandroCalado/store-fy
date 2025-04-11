import { SearchIcon } from 'lucide-react';

import { Input } from '../ui/input';

export const NavSearch = () => {
  return (
    <div className='focus-within:ring-ring/50 focus-within:border-ring flex w-full max-w-xs items-center rounded-md border px-3 focus-within:ring-[3px]'>
      <SearchIcon className='text-muted-foreground transition-all duration-150' />
      <Input
        type='search'
        placeholder='Procurar produtos...'
        className='border-none outline-none focus-visible:ring-0'
      />
    </div>
  );
};
