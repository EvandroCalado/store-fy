import { ComponentProps } from 'react';

type ProductFilterTitleProps = ComponentProps<'h2'>;

export function ProductFilterTitle({ ...props }: ProductFilterTitleProps) {
  return (
    <h2
      className='after:bg-primary after:content-[" "] relative mb-8 flex items-center gap-2 font-semibold after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-10'
      {...props}
    >
      {props.children}
    </h2>
  );
}
