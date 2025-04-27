'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { signIn } from '@/auth';
import { signInUserSchema } from '@/schemas/sign-in-user';
import { SignInUser } from '@/types/sign-in-user';
import { formatErrors } from '@/utils/formatErrors';

export async function signInUserWithCredentials(data: SignInUser) {
  try {
    const user = signInUserSchema.parse(data);

    await signIn('credentials', user);

    return {
      success: true,
      message: 'Signed in successfully',
    };
  } catch (error) {
    if (isRedirectError(error)) {
      console.log(error);
      throw error;
    }

    return {
      success: false,
      message: formatErrors(error),
    };
  }
}
