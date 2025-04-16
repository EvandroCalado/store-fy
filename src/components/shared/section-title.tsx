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

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className='bg-muted flex h-40 w-full flex-col items-center justify-center overflow-hidden'>
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

        <span className='text-muted-foreground/[5%] absolute right-4 -bottom-20 text-[85px] font-bold tracking-tighter sm:-bottom-32 sm:text-[180px] md:right-8 md:-bottom-36 md:text-[210px]'>
          Store<span className='text-primary/[5%]'>FY</span>
        </span>
      </Container>
    </div>
  );
};
