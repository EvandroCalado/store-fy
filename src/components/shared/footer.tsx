import Image from 'next/image';
import Link from 'next/link';

import { Container } from './container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-muted-foreground/10'>
      <Container className='flex flex-col items-center justify-between gap-2 py-8 md:flex-row'>
        <p>
          {year} &copy; <strong>StoreFy</strong>. Todos os direitos reservados.
        </p>

        <div className='flex items-center gap-2'>
          <p>Baixe o aplicativo StoreFy.</p>

          <Link href='/'>
            <Image
              src={'/footer/f-app.jpg'}
              alt='Baixe o aplicativo StoreFy'
              width={80}
              height={80}
              priority
              className='w-auto'
            />
          </Link>

          <Link href='/'>
            <Image
              src={'/footer/f-google.jpg'}
              alt='Baixe o aplicativo StoreFy'
              width={80}
              height={80}
              priority
              className='w-auto'
            />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
