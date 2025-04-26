'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { Loader2, SaveAll } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateUser } from '@/actions/update-user';
import { updateUserSchema } from '@/schemas/update-user';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

type AdminUsersUpdateProps = {
  user: User;
};

export const AdminUsersUpdate = ({ user }: AdminUsersUpdateProps) => {
  const router = useRouter();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
    mode: 'onChange',
  });

  const onSubmit = async (values: UpdateUserSchema) => {
    const res = await updateUser(values);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    router.push('/admin/users');

    toast.success(res.message);
  };

  return (
    <div className='space-y-8'>
      <h1 className='text-xl font-semibold'>Detalhe do Usuários</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid gap-5 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='john Doe' {...field} />
                  </FormControl>
                  <FormMessage className='absolute -bottom-5 left-0' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='example@email.com'
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='absolute -bottom-5 left-0' />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel>Cargo</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione um cargo' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='admin'>Administrador</SelectItem>
                    <SelectItem value='user'>Usuário</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className='absolute -bottom-5 left-0' />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='my-2'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='animate-spin' />
            ) : (
              <SaveAll />
            )}
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
};
