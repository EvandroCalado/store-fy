import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { SignInForm } from '@/components/auth/sign-in-form';
import { Logo } from '@/components/shared/logo';

export const metadata: Metadata = {
  title: 'Login',
};

type SignInPageParams = {
  searchParams: Promise<{ callbackUrl: string }>;
};

const SignInPage = async ({ searchParams }: SignInPageParams) => {
  const { callbackUrl } = await searchParams;

  const session = await auth();

  if (session) redirect(callbackUrl || '/');

  return (
    <>
      <Logo className='absolute top-4 left-4' />
      <SignInForm />
    </>
  );
};

export default SignInPage;
