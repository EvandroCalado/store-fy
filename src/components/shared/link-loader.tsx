'use client';

import { JSX } from 'react';

import { useLinkStatus } from 'next/link';

import { Edit, Loader, MoveLeft, MoveRight, Plus, Search } from 'lucide-react';

type IconName = 'move-left' | 'move-right' | 'search' | 'edit' | 'plus';

type LinkLoaderProps = {
  iconName?: IconName;
};

export function LinkLoader({ iconName = 'move-right' }: LinkLoaderProps) {
  const { pending } = useLinkStatus();

  const iconDictionary: { [key: string]: JSX.Element } = {
    'move-left': <MoveLeft />,
    'move-right': <MoveRight />,
    search: <Search />,
    edit: <Edit />,
    plus: <Plus className='stroke-4' />,
  };

  return (
    <>
      {pending ? <Loader className='animate-spin' /> : iconDictionary[iconName]}
    </>
  );
}
