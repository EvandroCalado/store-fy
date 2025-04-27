import { MoveRight } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '../ui/breadcrumb';
import { Container } from './container';

type SectionTitleProps = {
  title: string;
};

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className='flex h-40 w-full flex-col items-center justify-center overflow-hidden bg-[url("/bg/section-title.svg")]'>
      <Container className='relative space-y-4'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <MoveRight className='size-4' />
          </BreadcrumbList>
        </Breadcrumb>

        <h2 className='text-muted-foreground text-2xl font-semibold tracking-tight md:text-4xl'>
          {title}
        </h2>
      </Container>
    </div>
  );
}
