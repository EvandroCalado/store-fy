'use client';

import { JSX } from 'react';

import { useLinkStatus } from 'next/link';

import { Edit, Loader, MoveLeft, MoveRight, Plus, Search } from 'lucide-react';

type IconName = 'MoveLeft' | 'MoveRight' | 'Search' | 'Edit' | 'Plus';

type LinkLoaderProps = {
  iconName?: IconName;
};

export const LinkLoader = ({ iconName = 'MoveLeft' }: LinkLoaderProps) => {
  const { pending } = useLinkStatus();

  const iconDictionary: { [key: string]: JSX.Element } = {
    MoveLeft: <MoveLeft />,
    MoveRight: <MoveRight />,
    Search: <Search />,
    Edit: <Edit />,
    Plus: <Plus className='stroke-4' />,
  };

  return (
    <>
      {pending ? <Loader className='animate-spin' /> : iconDictionary[iconName]}
    </>
  );
};
