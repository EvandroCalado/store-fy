import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { Logo } from '@/components/shared/logo';

export const metadata: Metadata = {
  title: 'Cadastrar',
};

type SignInPageParams = {
  searchParams: Promise<{ callbackUrl: string }>;
};

const SignUpPage = async ({ searchParams }: SignInPageParams) => {
  const { callbackUrl } = await searchParams;

  const session = await auth();

  if (session) redirect(callbackUrl || '/');

  return (
    <>
      <Logo className='absolute top-4 left-4' />
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
