'use client';

import { JSX } from 'react';

import { useLinkStatus } from 'next/link';

import { Loader, MoveLeft, MoveRight, Search } from 'lucide-react';

type IconName = 'MoveLeft' | 'MoveRight' | 'Search';

type LinkLoaderProps = {
  iconName?: IconName;
};

export const LinkLoader = ({ iconName = 'MoveLeft' }: LinkLoaderProps) => {
  const { pending } = useLinkStatus();

  const iconDictionary: { [key: string]: JSX.Element } = {
    MoveLeft: <MoveLeft />,
    MoveRight: <MoveRight />,
    Search: <Search />,
  };

  return (
    <>
      {pending ? <Loader className='animate-spin' /> : iconDictionary[iconName]}
    </>
  );
};
