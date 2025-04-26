import { SearchIcon } from 'lucide-react';

import { getAllCategories } from '@/actions/get-all-categories';
import { Button } from '@/components/ui/button';

import { Categories } from './categories';
import { Search } from './search';

export const SearchBar = async () => {
  const categories = await getAllCategories();

  return (
    <form
      action='/products'
      method='get'
      className='flex w-full max-w-sm items-center'
    >
      <Categories categories={categories} />

      <Search />

      <Button type='submit' size={'icon'} className='rounded-l-none'>
        <SearchIcon />
      </Button>
    </form>
  );
};
