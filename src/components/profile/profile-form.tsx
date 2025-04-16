'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateProfile } from '@/actions/update-profile';
import { updateProfileSchema } from '@/schemas/update-profile';

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

type UpdateProfile = z.infer<typeof updateProfileSchema>;

export const ProfileForm = () => {
  const { data: session, update } = useSession();

  const form = useForm<UpdateProfile>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session?.user?.name ?? '',
      email: session?.user?.email ?? '',
    },
  });

  const onSubmit = async (values: UpdateProfile) => {
    const res = await updateProfile(values);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: values.name,
      },
    };

    await update(newSession).then(() =>
      window.dispatchEvent(new CustomEvent('nameUpdated')),
    );

    toast.success(res.message);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='my-8 w-full space-y-8'
      >
        <div className='flex w-full flex-col items-center gap-5 sm:flex-row'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='relative w-full sm:max-w-sm'>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder='Nome' {...field} />
                </FormControl>
                <FormMessage className='absolute -bottom-5 left-0' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full sm:max-w-sm'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className='animate-spin' />
          ) : (
            <Save />
          )}
          Salvar
        </Button>
      </form>
    </Form>
  );
};
