'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { hashSync } from 'bcrypt-ts-edge';

import { signIn } from '@/auth';
import { prisma } from '@/db/prisma';
import { signUpUserSchema } from '@/schemas/sign-up-user';
import { formatErrors } from '@/utils/formatErrors';

export const signUpUserWithCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const user = signUpUserSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    const hashedPassword = hashSync(user.password);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    await signIn('credentials', {
      email: user.email,
      password: user.password,
    });

    return {
      success: true,
      message: 'Signed up successfully',
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: formatErrors(error),
    };
  }
};
