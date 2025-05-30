import { SessionProvider } from 'next-auth/react';

import { getMyCart } from '@/actions/get-my-cart';
import { auth } from '@/auth';

import { Container } from '../container';
import { Logo } from '../logo';
import { CartButton } from './cart-button';
import { DarkMode } from './dark-mode';
import { MenuMobile } from './menu-mobile';
import { Navbar } from './navbar';
import { Search } from './search';
import { UserMenu } from './user-menu';

export async function Header() {
  const session = await auth();
  const cart = await getMyCart();

  const totalItems = cart?.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header>
      <div>
        <Container className='relative flex items-center justify-between gap-2 py-4'>
          <MenuMobile />

          <Logo className='hidden max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2 md:block' />

          <Search />

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
}
