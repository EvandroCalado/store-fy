'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { navLinks } from '@/utils/nav-links';

import { GlobalLoader } from '../global-loader';

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='flex items-center gap-4'>
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
    </nav>
  );
}
