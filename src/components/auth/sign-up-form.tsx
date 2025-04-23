'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MoveRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { signUpUserWithCredentials } from '@/actions/sign-up-user-with-credentials';
import { signUpUserSchema } from '@/schemas/sign-up-user';
import { SignUpUser } from '@/types/sign-up-user';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<SignUpUser>({
    resolver: zodResolver(signUpUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    mode: 'onChange',
  });

  const onSubmit = async (values: SignUpUser) => {
    const res = await signUpUserWithCredentials(values);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    router.push('/');
  };

  return (
    <Card className='m-5 flex w-full items-center gap-6 border-none p-5 sm:max-w-xl sm:flex-row'>
      <Image
        src='/auth/auth.jpg'
        alt='Auth image'
        width={300}
        height={500}
        priority
        className='h-[230px] w-full rounded-lg object-cover object-center sm:h-[400px] sm:w-[230px]'
      />

      <div className='w-full space-y-4'>
        <CardHeader className='px-2'>
          <CardTitle className='text-primary text-center text-2xl tracking-tight sm:text-left'>
            Cadastrar
          </CardTitle>
          <CardDescription className='text-muted-foreground text-center sm:text-left'>
            Entre com seus dados para se cadastrar
          </CardDescription>
        </CardHeader>

        <CardContent className='px-2'>
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='relative w-full sm:max-w-sm'>
                    <FormControl>
                      <Input type='text' placeholder='Nome' {...field} />
                    </FormControl>
                    <FormMessage className='absolute -bottom-5 left-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='relative w-full sm:max-w-sm'>
                    <FormControl>
                      <Input type='email' placeholder='Email' {...field} />
                    </FormControl>
                    <FormMessage className='absolute -bottom-5 left-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='relative w-full sm:max-w-sm'>
                    <FormControl>
                      <Input type='password' placeholder='Senha' {...field} />
                    </FormControl>
                    <FormMessage className='absolute -bottom-5 left-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='relative w-full sm:max-w-sm'>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Confirme a senha'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='absolute -bottom-5 left-0' />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='my-2 w-full sm:justify-between'
                disabled={form.formState.isSubmitting}
              >
                Cadastrar
                {form.formState.isSubmitting ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <MoveRight />
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className='flex items-center justify-center px-2 sm:justify-start'>
          <p className='text-muted-foreground'>
            Já tem conta?{' '}
            <Link
              href='/sign-in'
              target='_self'
              className='text-primary underline-offset-4 duration-150 hover:underline'
            >
              Entrar
            </Link>
          </p>
        </CardFooter>
      </div>
    </Card>
  );
};
