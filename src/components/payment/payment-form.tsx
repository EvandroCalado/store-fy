'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateUserPaymentMethod } from '@/actions/update-user-payment-method';
import { paymentMethodSchema } from '@/schemas/payment-method';
import { PaymentMethod } from '@/types/payment-method';
import { CONSTANTS } from '@/utils/constants';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type PaymentFormProps = {
  preferredPaymentMethod: string | null;
};

export const PaymentForm = ({ preferredPaymentMethod }: PaymentFormProps) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || CONSTANTS.DEFAULT_PAYMENT_METHOD,
    },
  });

  const onSubmit = async (values: PaymentMethod) => {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values);
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      router.push('/place-order');
    });
  };

  return (
    <>
      <h2 className='text-muted-foreground mb-5 text-xl font-semibold'>
        Forma de pagamento
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem className='relative w-full'>
                <FormLabel className='text-muted-foreground mb-4'>
                  Selecione a forma de pagamento
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col space-y-2'
                  >
                    {CONSTANTS.PAYMENT_METHODS.map(paymentMethod => (
                      <FormItem
                        key={paymentMethod}
                        className='flex items-center space-y-0 space-x-3'
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={paymentMethod}
                            checked={field.value === paymentMethod}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {paymentMethod}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>

                <FormMessage className='absolute -bottom-6 left-0' />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isPending} className='mt-2'>
            {isPending ? <Loader2 className='animate-spin' /> : <ArrowRight />}
            Continuar
          </Button>
        </form>
      </Form>
    </>
  );
};
