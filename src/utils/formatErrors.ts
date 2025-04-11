import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';

export const formatErrors = (error: any) => {
  if (error instanceof ZodError) {
    const fieldErrors = Object.keys(error.errors).map(
      (field: string) => (error.errors as any)[field].message,
    );

    return fieldErrors.join('. ');
  }

  if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === 'P2002'
  ) {
    const field = error.meta?.target
      ? (error.meta.target as string[])[0]
      : null;

    return `${field?.charAt(0).toUpperCase()}${field?.slice(1)} já está em uso.`;
  }

  if (error.type === 'CredentialsSignin') {
    return 'Email ou senha inválidos.';
  }

  return typeof error.message === 'string'
    ? error.message
    : JSON.stringify(error.message);
};
