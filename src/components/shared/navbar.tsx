'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { navLinks } from '@/utils/nav-links';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='hidden items-center gap-4 md:flex'>
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
          {link.name}
        </Link>
      ))}
    </nav>
  );
};
