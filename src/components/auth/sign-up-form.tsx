'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { Loader2 } from 'lucide-react';

import { signUpUserWithCredentials } from '@/actions/sign-up-user-with-credentials';

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

export const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(
    signUpUserWithCredentials,
    {
      success: false,
      message: '',
    },
  );

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-center text-2xl tracking-tight'>
          Cadastrar
        </CardTitle>
        <CardDescription className='text-muted-foreground text-center'>
          Entre com seus dados para se cadastrar
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className='space-y-4' action={formAction}>
          <div>
            <Label htmlFor='name' className='mb-1'>
              Nome
            </Label>
            <Input
              id='name'
              type='text'
              name='name'
              placeholder='Ex: Jose da Silva'
              autoComplete='name'
              defaultValue=''
            />
          </div>
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
          <div>
            <Label htmlFor='confirmPassword' className='mb-1'>
              Confirmação de Senha
            </Label>
            <Input
              id='confirmPassword'
              type='password'
              name='confirmPassword'
              placeholder='******'
              autoComplete='confirmPassword'
              defaultValue=''
            />
          </div>

          <Button type='submit' className='my-4 w-full' disabled={isPending}>
            {isPending && (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                <span>Cadastrando...</span>
              </>
            )}

            {!isPending && 'Cadastrar'}
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
          Já tem conta?{' '}
          <Link
            href='/sign-in'
            target='_self'
            className='text-foreground hover:text-primary underline underline-offset-4 duration-150'
          >
            Entrar
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
