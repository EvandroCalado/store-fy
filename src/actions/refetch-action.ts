'use server';

import { revalidateTag } from 'next/cache';

export async function refetchAction(tag: string) {
  revalidateTag(tag);
}
