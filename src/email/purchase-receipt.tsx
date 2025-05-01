import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { sampleData } from '@/db/sample-data';
import { Order } from '@/types/order';
import { formatCurrency } from '@/utils/formatCurrency';

PurchaseReceipt.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    userId: '123',
    user: {
      name: 'John Doe',
      email: 'test@test.com',
    },
    paymentMethod: 'Stripe',

    createdAt: new Date(),
    totalPrice: 100,
    taxPrice: 10,
    shippingPrice: 10,
    itemsPrice: 80,
    orderItems: sampleData.products.map(item => ({
      id: '123',
      name: item.name,
      orderId: '132',
      productId: '123',
      slug: item.slug,
      quantity: item.stock,
      image: item.images[0],
      price: item.price,
    })),
    isDelivered: true,
    deliveredAt: new Date(),
    isPaid: true,
    paidAt: new Date(),
  },
} satisfies PurchaseReceiptProps;

const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'medium',
});

type PurchaseReceiptProps = {
  order: Omit<Order, 'shippingAddress' | 'paymentResult'>;
};

export default function PurchaseReceipt({ order }: PurchaseReceiptProps) {
  return (
    <Html>
      <Preview>Confirmação do Pedido</Preview>
      <Tailwind>
        <Head />
        <Body className='bg-white font-sans'>
          <Container className='max-w-xl'>
            <Heading>Recibo de compra</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className='text-muted-foreground mr-4 mb-0 font-semibold text-nowrap whitespace-nowrap'>
                    Id do pedido
                  </Text>
                  <Text className='mr-4 mb-0'>{order.id.toString()}</Text>
                </Column>

                <Column>
                  <Text className='text-muted-foreground mr-4 mb-0 font-semibold text-nowrap whitespace-nowrap'>
                    Data
                  </Text>
                  <Text className='mr-4 mb-0'>
                    {dateFormat.format(order.createdAt)}
                  </Text>
                </Column>

                <Column>
                  <Text className='text-muted-foreground mr-4 mb-0 font-semibold text-nowrap whitespace-nowrap'>
                    Preço
                  </Text>
                  <Text className='mr-4 mb-0'>
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section className='border-muted-foreground my-4 rounded-lg border border-solid p-4 md:p-6'>
              {order.orderItems.map(item => (
                <Row key={item.orderId} className='mt-8'>
                  <Column>
                    <Img
                      src={
                        item.image.startsWith('/')
                          ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${item.image}`
                          : item.image
                      }
                      alt={item.name}
                      width={60}
                      className='rounded'
                    />
                  </Column>
                  <Column className='align-top capitalize'>
                    {item.name} X {item.quantity}
                  </Column>
                  <Column className='align-top font-semibold' align='right'>
                    {formatCurrency(item.price)}
                  </Column>
                </Row>
              ))}

              {[
                { name: 'Produtos', price: order.itemsPrice },
                { name: 'Taxa', price: order.taxPrice },
                { name: 'Entrega', price: order.shippingPrice },
                { name: 'Total', price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className='py-1 font-semibold'>
                  <Column align='right'>{name}: </Column>
                  <Column align='right' width={70} className='align-top'>
                    <Text className='m-0'>{formatCurrency(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
