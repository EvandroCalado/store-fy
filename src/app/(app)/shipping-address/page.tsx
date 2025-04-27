import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getMyCart } from '@/actions/get-my-cart';
import { getUserById } from '@/actions/get-user-by-id';
import { auth } from '@/auth';
import { CheckoutSteps } from '@/components/shared/checkout-steps';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';
import { ShippingForm } from '@/components/shipping/shipping-form';
import { ShippingAddress } from '@/types/shipping-address';

export const metadata: Metadata = {
  title: 'Endereço de entrega',
};

export default async function ShippingAddressPage() {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect('/');

  const session = await auth();
  const userId = session?.user?.id;

  const user = await getUserById(userId);

  return (
    <>
      <SectionTitle title='Endereço de entrega' />

      <Container className='my-8'>
        <CheckoutSteps current={1} />
        <ShippingForm address={user.address as ShippingAddress} />
      </Container>
    </>
  );
}
