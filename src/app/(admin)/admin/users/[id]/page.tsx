import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getUserById } from '@/actions/get-user-by-id';
import { AdminUsersUpdate } from '@/components/admin/admin-users-update';
import { Container } from '@/components/shared/container';

export const metadata: Metadata = {
  title: 'Atualizar usuário',
};

type AdminUserPageParams = {
  params: Promise<{ id: string }>;
};

export default async function AdminUserPage({ params }: AdminUserPageParams) {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) return notFound();

  return (
    <Container className='my-8'>
      <AdminUsersUpdate user={user} />
    </Container>
  );
}
