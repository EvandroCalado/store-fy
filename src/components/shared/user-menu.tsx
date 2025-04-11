import Link from 'next/link';

import { signOutUser } from '@/actions/sign-out-user';
import { auth } from '@/auth';
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

export const UserMenu = async () => {
  const session = await auth();

  const firstInitial = session?.user?.name?.charAt(0);

  return (
    <>
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 rounded-full p-0 duration-150 hover:brightness-90'
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

            <DropdownMenuItem className='p-0'>
              <form action={signOutUser} className='h-full w-full'>
                <button
                  type='submit'
                  className='h-full w-full cursor-pointer px-2 py-1.5 text-left'
                >
                  Sair
                </button>
              </form>
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
