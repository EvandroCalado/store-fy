import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export const Container = ({
  children,
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-6xl px-4 md:px-8 xl:max-w-7xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
