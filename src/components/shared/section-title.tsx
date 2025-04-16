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

  const pathSegments = pathname.split('/').filter(Boolean);

  const pathDictionary: { [key: string]: string } = {
    product:
      pathSegments[0] === 'product' && pathSegments.length > 1
        ? 'Detalhes do Produto'
        : 'Produtos',
    cart: 'Carrinho',
    'shipping-address': 'Endereço de entrega',
    'payment-method': 'Forma de pagamento',
    'place-order': 'Finalizar compra',
    orders: 'Meus Pedidos',
  };

  return (
    <div className='bg-muted flex h-40 w-full flex-col items-center justify-center overflow-hidden'>
      <Container className='relative space-y-4'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/${pathSegments[0]}`}>
                {pathDictionary[pathSegments[0]]}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h2 className='text-muted-foreground text-2xl font-semibold tracking-tight md:text-4xl'>
          {title}
        </h2>

        <span className='text-muted-foreground/[5%] absolute right-4 -bottom-20 text-[85px] font-bold tracking-tighter sm:-bottom-32 sm:text-[180px] md:right-8 md:-bottom-36 md:text-[210px]'>
          Store<span className='text-primary/[5%]'>FY</span>
        </span>
      </Container>
    </div>
  );
};
