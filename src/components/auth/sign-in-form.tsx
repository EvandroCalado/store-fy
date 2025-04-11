'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { Loader2 } from 'lucide-react';

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
import { Label } from '../ui/label';

export const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(
    signInUserWithCredentials,
    {
      success: false,
      message: '',
    },
  );

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-center text-2xl tracking-tight'>
          Entrar
        </CardTitle>
        <CardDescription className='text-muted-foreground text-center'>
          Entre com suas credenciais
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className='space-y-4' action={formAction}>
          <div>
            <Label htmlFor='email' className='mb-1'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              name='email'
              placeholder='Ex: jose@email.com'
              autoComplete='email'
              defaultValue=''
            />
          </div>
          <div>
            <Label htmlFor='password' className='mb-1'>
              Senha
            </Label>
            <Input
              id='password'
              type='password'
              name='password'
              placeholder='******'
              autoComplete='password'
              defaultValue=''
            />
          </div>

          <Button type='submit' className='my-4 w-full' disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                <span>Entrando...</span>
              </>
            ) : (
              'Entrar'
            )}
          </Button>

          {state && !state.success && (
            <p className='text-destructive text-center text-sm'>
              {state.message}
            </p>
          )}
        </form>
      </CardContent>

      <CardFooter className='mx-auto'>
        <p className='text-muted-foreground text-center'>
          Ainda não tem conta?{' '}
          <Link
            href='/sign-up'
            target='_self'
            className='text-foreground hover:text-primary underline underline-offset-4 duration-150'
          >
            Criar conta
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
