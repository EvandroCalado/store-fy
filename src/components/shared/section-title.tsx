'use client';

import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Container } from './container';

type SectionTitleProps = {
  title: string;
};

export const SectionTitle = ({ title }: SectionTitleProps) => {
  const pathname = usePathname();

  const [path] = pathname.split('/').filter(Boolean);

  const pathDictionary: { [key: string]: string } = {
    products: 'Produtos',
    cart: 'Carrinho',
    'shipping-address': 'Endereço de entrega',
    'payment-method': 'Forma de pagamento',
    'place-order': 'Finalizar compra',
  };

  return (
    <div className='flex h-40 w-full flex-col items-center justify-center bg-[url("/breadcrumb/breadcrumb-01.jpg")]'>
      <Container className='space-y-4'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/${path}`}>
                {pathDictionary[path]}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h2 className='text-muted-foreground text-2xl font-semibold tracking-tight md:text-4xl'>
          {title}
        </h2>
      </Container>
    </div>
  );
};
