'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { signOut, useSession } from 'next-auth/react';

import { userMenuLinks } from '@/utils/userMenuLinks';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const UserMenu = () => {
  const { data: session, update } = useSession();

  const firstInitial = session?.user?.name?.charAt(0);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (window.navigator.onLine) update();
      },
      1000 * 60 * 60,
    );
    return () => clearInterval(interval);
  }, [update]);

  useEffect(() => {
    const nameUpdatedEventHandler = () => update();

    window.addEventListener('nameUpdated', nameUpdatedEventHandler, false);
    return () => {
      window.removeEventListener('nameUpdated', nameUpdatedEventHandler);
    };
  }, [update]);

  return (
    <>
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 rounded-full p-0 duration-150 hover:brightness-90'
              title='Abrir menu de usuário'
              aria-label='Abrir menu de usuário'
            >
              <Avatar>
                <AvatarImage src={session?.user?.image || ''} />
                <AvatarFallback className='uppercase'>
                  {firstInitial}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>
              <p>{session.user?.name}</p>
              <p className='text-muted-foreground text-xs'>
                {session.user?.email}
              </p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {userMenuLinks.map(link => (
              <DropdownMenuItem key={link.name} asChild>
                <Link href={link.href} className='cursor-pointer'>
                  {link.name}
                </Link>
              </DropdownMenuItem>
            ))}

            {session.user?.role === 'admin' && (
              <DropdownMenuItem key='administração' asChild>
                <Link href='/admin' className='cursor-pointer'>
                  Administração
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem className='p-0'>
              <button
                type='submit'
                className='h-full w-full cursor-pointer px-2 py-1.5 text-left'
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sair
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {!session && (
        <Button asChild>
          <Link href={'/sign-in'}>Entrar</Link>
        </Button>
      )}
    </>
  );
};
