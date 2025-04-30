import { NextRequest, NextResponse } from 'next/server';

import Stripe from 'stripe';

import { updateOrderToPaid } from '@/actions/update-order-to-paid';

export async function POST(req: NextRequest) {
  const event = await Stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  if (event.type === 'charge.succeeded') {
    const { object } = event.data;

    await updateOrderToPaid({
      orderId: object.metadata.orderId,
      paymentResult: {
        id: object.id,
        status: 'COMPLETE',
        email_address: object.billing_details.email!,
        pricePaid: (object.amount / 100).toFixed(2),
      },
    });

    return NextResponse.json({ message: 'Pedido pago com sucesso' });
  }

  return NextResponse.json({
    message: 'Evento não foi processado com sucesso',
  });
}
