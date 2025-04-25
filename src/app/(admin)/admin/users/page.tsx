import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SearchParams } from 'nuqs';

import { getAllUsers } from '@/actions/get-all-users';
import { refetchAction } from '@/actions/refetch-action';
import { loadSearchParams } from '@/app/search-params';
import { AdminUsers } from '@/components/admin/admin-users';
import { Container } from '@/components/shared/container';
import { Pagination } from '@/components/shared/pagination';

export const metadata: Metadata = {
  title: 'Administração de Usuários',
};

type AdminUsersPageParams = {
  searchParams: Promise<SearchParams>;
};

const AdminUsersPage = async ({ searchParams }: AdminUsersPageParams) => {
  const { page, query } = await loadSearchParams(searchParams);

  const data = await getAllUsers({ page, query, limit: 12 });

  if (!data) return notFound();

  return (
    <Container className='my-8'>
      <h1 className='text-xl font-semibold'>Usuários</h1>

      <AdminUsers users={data.users} />
      <Pagination totalPages={data.totalPages} refetchAction={refetchAction} />
    </Container>
  );
};

export default AdminUsersPage;
