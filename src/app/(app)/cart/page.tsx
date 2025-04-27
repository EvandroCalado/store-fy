import { Metadata } from 'next';

import { getMyCart } from '@/actions/get-my-cart';
import { CartSummary } from '@/components/cart/cart-summary';
import { CartTable } from '@/components/cart/cart-table';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';

export const metadata: Metadata = {
  title: 'Carrinho',
};

export default async function CartPage() {
  const cart = await getMyCart();

  return (
    <>
      <SectionTitle title='Carrinho de compras' />

      <Container className='my-8 grid flex-1 gap-4 md:grid-cols-4'>
        <CartTable cart={cart} />
        <CartSummary cart={cart} />
      </Container>
    </>
  );
}
