import Link from 'next/link';

import { OctagonAlertIcon } from 'lucide-react';

import { LinkLoader } from '@/components/shared/link-loader';
import { Button } from '@/components/ui/button';

export default async function NotFoundPage() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-8 px-4'>
      <OctagonAlertIcon className='text-muted-foreground/20 size-32 animate-bounce stroke-1' />

      <h1 className='text-2xl font-semibold sm:text-3xl md:text-4xl'>
        404. Página não encontrada
      </h1>

      <p className='text-muted-foreground/40 max-w-xl text-center text-xs md:text-base'>
        Desculpe. Não conseguimos encontrar a página que você estava procurando.
        Nós recomendamos que você volte para a página inicial.
      </p>

      <Button asChild>
        <Link href='/'>
          <LinkLoader />
          <p>Voltar para home</p>
        </Link>
      </Button>
    </div>
  );
}
