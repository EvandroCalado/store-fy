import 'dotenv/config';

import { Resend } from 'resend';

import { Order } from '@/types/order';
import { CONSTANTS } from '@/utils/constants';

import PurchaseReceipt from './purchase-receipt';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_APY_KEY);

type SendEmailReceiptProps = {
  order: Omit<Order, 'shippingAddress' | 'paymentResult'>;
};

export async function sendEmailReceipt({ order }: SendEmailReceiptProps) {
  await resend.emails.send({
    to: order.user.email,
    from: `${CONSTANTS.APP_NAME} <${CONSTANTS.SENDER_EMAIL}>`,
    subject: `Confirmação do Pedido ${order.id}`,
    react: <PurchaseReceipt order={order} />,
  });
}
