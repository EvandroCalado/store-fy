'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateUserAddress } from '@/actions/update-user-address';
import { shippingAddressSchema } from '@/schemas/shipping-address';
import { ShippingAddress } from '@/types/shipping-address';
import { SHIPPING_ADDRESS_DEFAULT_VALUES } from '@/utils/constants';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export type ShippingFormProps = {
  address: ShippingAddress;
};

export function ShippingForm({ address }: ShippingFormProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || SHIPPING_ADDRESS_DEFAULT_VALUES,
  });

  const onSubmit = async (values: ShippingAddress) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      router.push('/payment-method');
    });
  };

  return (
    <>
      <h2 className='text-muted-foreground mb-5 text-xl font-semibold'>
        Informações de entrega
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='flex flex-col gap-6 sm:flex-row'>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem className='relative w-full'>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder='José da Silva' {...field} />
                  </FormControl>

                  <FormMessage className='absolute -bottom-5 left-0' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='streetAddress'
              render={({ field }) => (
                <FormItem className='relative w-full'>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder='Av. Paulista' {...field} />
                  </FormControl>

                  <FormMessage className='absolute -bottom-5 left-0' />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-6 sm:flex-row'>
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem className='relative w-full'>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder='São Paulo' {...field} />
                  </FormControl>

                  <FormMessage className='absolute -bottom-5 left-0' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem className='relative w-full'>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input placeholder='BRA' {...field} />
                  </FormControl>

                  <FormMessage className='absolute -bottom-5 left-0' />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-6 sm:flex-row'>
            <FormField
              control={form.control}
              name='postalCode'
              render={({ field }) => (
                <FormItem className='relative w-full'>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder='00000-000' {...field} />
                  </FormControl>

                  <FormMessage className='absolute -bottom-5 left-0' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lat'
              render={({ field }) => (
                <FormItem className='relative w-full'>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input placeholder='-23.000' {...field} />
                  </FormControl>

                  <FormMessage className='absolute -bottom-5 left-0' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lng'
              render={({ field }) => (
                <FormItem className='relative w-full'>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input placeholder='-46.000' {...field} />
                  </FormControl>

                  <FormMessage className='absolute -bottom-5 left-0' />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' disabled={isPending}>
            {isPending ? <Loader2 className='animate-spin' /> : <ArrowRight />}
            Continuar
          </Button>
        </form>
      </Form>
    </>
  );
}
