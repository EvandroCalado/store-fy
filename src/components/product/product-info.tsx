import Image from 'next/image';

import { Card, CardContent } from '../ui/card';

const cardsInfo = [
  {
    icon: '/info/product-det-1.png',
    title: 'Frete grátis para compra acima de R$ 100,00',
  },
  {
    icon: '/info/product-det-2.png',
    title: 'Garantia 100% de satisfação',
  },
  {
    icon: '/info/product-det-3.png',
    title: '30 dias de garantia para devolução',
  },
];

export function ProductInfo() {
  return (
    <div className='space-y-2 md:col-span-2'>
      {cardsInfo.map(card => (
        <Card key={card.title} className='mb-4 p-3'>
          <CardContent className='flex items-center gap-2'>
            <Image
              src={card.icon}
              alt={card.title}
              width={30}
              height={30}
              priority
            />
            <p className='text-muted-foreground'>{card.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
