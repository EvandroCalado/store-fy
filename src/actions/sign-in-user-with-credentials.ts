'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { signIn } from '@/auth';
import { signInUserSchema } from '@/schemas/sign-in-user';
import { formatErrors } from '@/utils/formatErrors';

export const signInUserWithCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const user = signInUserSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

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
};
