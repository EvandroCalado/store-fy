import { Metadata } from 'next';

import { auth } from '@/auth';
import { PaymentForm } from '@/components/payment/payment-form';
import { CheckoutSteps } from '@/components/shared/checkout-steps';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';

export const metadata: Metadata = {
  title: 'Forma de pagamento',
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('User not found');

  // const user = await getUserById(userId);

  return (
    <>
      <SectionTitle title='Forma de pagamento' />

      <Container className='my-8'>
        <CheckoutSteps current={2} />
        <PaymentForm preferredPaymentMethod={'credit'} />
      </Container>
    </>
  );
};

export default PaymentMethodPage;
