'use client';

import { useActionState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Loader2, MoveRight } from 'lucide-react';

import { signInUserWithCredentials } from '@/actions/sign-in-user-with-credentials';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';

export const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(
    signInUserWithCredentials,
    {
      success: false,
      message: '',
    },
  );

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
            Entrar
          </CardTitle>
          <CardDescription className='text-muted-foreground text-center sm:text-left'>
            Entre com suas credenciais
          </CardDescription>
        </CardHeader>

        <CardContent className='px-2'>
          <form className='space-y-4' action={formAction}>
            <Input
              id='email'
              type='email'
              name='email'
              placeholder='Nome'
              autoComplete='email'
              defaultValue=''
            />

            <Input
              id='password'
              type='password'
              name='password'
              placeholder='Senha'
              autoComplete='password'
              defaultValue=''
            />

            <Button
              type='submit'
              className='my-2 w-full sm:justify-between'
              disabled={isPending}
            >
              Entrar
              {isPending ? <Loader2 className='animate-spin' /> : <MoveRight />}
            </Button>

            {state && !state.success && (
              <p className='text-destructive text-center text-sm'>
                {state.message}
              </p>
            )}
          </form>
        </CardContent>

        <CardFooter className='flex items-center justify-center px-2 sm:justify-start'>
          <p className='text-muted-foreground'>
            Ainda não tem conta?{' '}
            <Link
              href='/sign-up'
              target='_self'
              className='text-primary underline-offset-4 duration-150 hover:underline'
            >
              Criar conta
            </Link>
          </p>
        </CardFooter>
      </div>
    </Card>
  );
};
