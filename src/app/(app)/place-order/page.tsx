import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { toast } from 'sonner';

import { getMyCart } from '@/actions/get-my-cart';
import { getUserById } from '@/actions/get-user-by-id';
import { auth } from '@/auth';
import { OrderAddress } from '@/components/order/order-address';
import { OrderItems } from '@/components/order/order-items';
import { OrderPaymentMethod } from '@/components/order/order-payment-method';
import { OrderSummary } from '@/components/order/order-summary';
import { CheckoutSteps } from '@/components/shared/checkout-steps';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';
import { ShippingAddress } from '@/types/shipping-address';

export const metadata: Metadata = {
  title: 'Finalizar compra',
};

const PlaceOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('User not found');

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) {
    toast.error('Carrinho de compras vazio');
    redirect('/');
  }

  if (!user.address) {
    toast.error('Endereço de entrega não encontrado');
    redirect('/shipping-address');
  }

  if (!user.paymentMethod) {
    toast.error('Método de pagamento não encontrado');
    redirect('/payment-method');
  }

  const userAddress = user.address as ShippingAddress;

  return (
    <>
      <SectionTitle title='Finalizar compra' />
      <Container className='my-8'>
        <CheckoutSteps current={3} />
        <div className='grid gap-5 md:grid-cols-3'>
          <h2 className='text-xl font-semibold md:col-span-3'>
            Resumo do pedido
          </h2>

          <div className='flex flex-col gap-3 overflow-x-auto md:col-span-2'>
            <OrderAddress address={userAddress} />
            <OrderPaymentMethod paymentMethod={user.paymentMethod} />
            <OrderItems cartItems={cart.items} />
          </div>
          <div className='flex flex-col gap-3'>
            <OrderSummary cart={cart} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default PlaceOrderPage;
