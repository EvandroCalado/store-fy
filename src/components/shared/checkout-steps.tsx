import { Fragment } from 'react';

import {
  CreditCard,
  LogIn,
  MapPinCheckInside,
  PackageCheck,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const steps = [
  {
    label: 'Login',
    icon: LogIn,
  },
  {
    label: 'Endereço',
    icon: MapPinCheckInside,
  },
  {
    label: 'Pagamento',
    icon: CreditCard,
  },
  {
    label: 'Finalizar',
    icon: PackageCheck,
  },
];

type CheckoutStepsProps = {
  current?: number;
};

export const CheckoutSteps = ({ current = 0 }: CheckoutStepsProps) => {
  return (
    <div className='mb-10 flex items-center justify-between gap-2'>
      {steps.map((step, index) => (
        <Fragment key={step.label}>
          <div
            title={step.label}
            aria-label={step.label}
            className={cn(
              'flex items-center justify-center gap-2 rounded-full p-2 text-sm md:w-56',
              {
                'bg-secondary': index === current,
              },
            )}
          >
            <step.icon className='text-muted-foreground size-4' />
            <span className='text-muted-foreground hidden font-semibold md:block'>
              {step.label}
            </span>
          </div>

          {step.label !== 'Finalizar Pedido' && (
            <hr className='w-16 border border-t' />
          )}
        </Fragment>
      ))}
    </div>
  );
};
