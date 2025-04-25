'use server';

import { revalidateTag } from 'next/cache';

export const refetchAction = async (tag: string) => {
  revalidateTag(tag);
};
