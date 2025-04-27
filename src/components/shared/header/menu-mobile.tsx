'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { navLinks } from '@/utils/nav-links';

import { GlobalLoader } from '../global-loader';

export function MenuMobile() {
  const pathname = usePathname();

  return (
    <div className='block md:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost'>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Navegue entre as páginas do site
            </SheetDescription>
          </SheetHeader>

          <div className='mt-8 flex flex-1 flex-col items-center justify-center gap-4'>
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'hover:text-primary font-semibold transition-colors duration-150',
                  {
                    'text-primary': pathname === link.href,
                  },
                )}
              >
                <GlobalLoader />
                {link.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
