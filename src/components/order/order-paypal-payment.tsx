'use client';

import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { approvePaypalOrder } from '@/actions/approve-paypal-order';
import { createPaypalOrder } from '@/actions/create-paypal-order';

const PrintLoadingState = () => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className='my-10 flex items-center justify-center'>
        <Loader2 className='size-14 animate-spin' />
      </div>
    );
  }

  if (isRejected) {
    return (
      <div className='my-10 flex items-center justify-center'>
        <p>Erro ao carregar PayPal</p>
      </div>
    );
  }
};

type OrderPayPalPaymentProps = {
  paypalClientId: string;
  isPaid: boolean;
  paymentMethod: string;
  orderId: string;
};

export const OrderPayPalPayment = ({
  paypalClientId,
  isPaid,
  paymentMethod,
  orderId,
}: OrderPayPalPaymentProps) => {
  const handleCreatePayPalOrder = async () => {
    const res = await createPaypalOrder(orderId);

    if (!res.success) {
      toast.error(res.message);
    }

    return res.data;
  };

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePaypalOrder(orderId, data);

    if (!res.success) {
      toast.error(res.message);
    }

    toast.success(res.message);
  };
  return (
    <>
      {!isPaid && paymentMethod === 'PayPal' && (
        <div>
          <PayPalScriptProvider
            options={{ clientId: paypalClientId, currency: 'BRL' }}
          >
            <PrintLoadingState />
            <PayPalButtons
              createOrder={handleCreatePayPalOrder}
              onApprove={handleApprovePayPalOrder}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </>
  );
};
