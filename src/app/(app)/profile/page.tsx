import { Metadata } from 'next';

import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { ProfileForm } from '@/components/profile/profile-form';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';

export const metadata: Metadata = {
  title: 'Perfil',
};

export default async function ProfilePage() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <SectionTitle title='Perfil' />
      <Container className='my-8'>
        <h2 className='text-xl font-semibold'>Informações do usuário</h2>
        <ProfileForm />
      </Container>
    </SessionProvider>
  );
}
