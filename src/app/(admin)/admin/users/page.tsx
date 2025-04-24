import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllUsers } from '@/actions/get-all-users';
import { AdminUsers } from '@/components/admin/admin-users';
import { Container } from '@/components/shared/container';
import { Pagination } from '@/components/shared/pagination';

export const metadata: Metadata = {
  title: 'Administração de Usuários',
};

type AdminUsersPageParams = {
  searchParams: Promise<{ page: string }>;
};

const AdminUsersPage = async ({ searchParams }: AdminUsersPageParams) => {
  const { page = '1' } = await searchParams;

  const data = await getAllUsers({ page: Number(page) });

  if (!data) return notFound();

  return (
    <Container className='my-8'>
      <AdminUsers users={data.users} />
      <Pagination page={Number(page)} totalPages={data.totalPages} />
    </Container>
  );
};

export default AdminUsersPage;
