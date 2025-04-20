'use client';

import { JSX } from 'react';

import { useLinkStatus } from 'next/link';

import { Edit, Loader, MoveLeft, MoveRight, Search } from 'lucide-react';

type IconName = 'MoveLeft' | 'MoveRight' | 'Search' | 'Edit';

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
  };

  return (
    <>
      {pending ? <Loader className='animate-spin' /> : iconDictionary[iconName]}
    </>
  );
};
