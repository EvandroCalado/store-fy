import { getMyCart } from '@/actions/get-my-cart';

import { CartButton } from './cart-button';
import { Container } from './container';
import { DarkMode } from './dark-mode';
import { Logo } from './logo';
import { MenuMobile } from './menu-mobile';
import { Navbar } from './navbar';
import { UserMenu } from './user-menu';

export const Header = async () => {
  const cart = await getMyCart();

  const totalItems = cart?.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header>
      <Container className='relative flex items-center justify-between gap-2 py-8'>
        <MenuMobile />

        <Logo className='max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2' />

        <Navbar />

        <div className='flex items-center md:gap-2'>
          <DarkMode />
          <CartButton totalItems={totalItems} />
          <UserMenu />
        </div>
      </Container>
    </header>
  );
};
