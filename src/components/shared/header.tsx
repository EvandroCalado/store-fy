import { SessionProvider } from 'next-auth/react';

import { getMyCart } from '@/actions/get-my-cart';
import { auth } from '@/auth';

import { CartButton } from './cart-button';
import { Container } from './container';
import { DarkMode } from './dark-mode';
import { Logo } from './logo';
import { MenuMobile } from './menu-mobile';
import { Navbar } from './navbar';
import { SearchBar } from './search-bar';
import { UserMenu } from './user-menu';

export const Header = async () => {
  const session = await auth();
  const cart = await getMyCart();

  const totalItems = cart?.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header>
      <div>
        <Container className='relative flex items-center justify-between gap-2 py-4'>
          <MenuMobile />

          <Logo className='hidden max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2 md:block' />

          <SearchBar />

          <div className='flex items-center md:gap-2'>
            <DarkMode />
            <CartButton totalItems={totalItems} />

            <SessionProvider session={session} refetchOnWindowFocus>
              <UserMenu />
            </SessionProvider>
          </div>
        </Container>
      </div>

      <div className='border-muted hidden border-t py-2 md:block'>
        <Container>
          <Navbar />
        </Container>
      </div>
    </header>
  );
};
