import Link from 'next/link';

import { User } from '@prisma/client';

import { deleteUser } from '@/actions/delete-user';

import { DeleteDialog } from '../shared/delete-dialog';
import { LinkLoader } from '../shared/link-loader';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type AdminUsersProps = {
  users: User[];
};

export const AdminUsers = ({ users }: AdminUsersProps) => {
  return (
    <div className='flex-1 overflow-x-auto'>
      <h1 className='text-xl font-semibold'>Usuários</h1>

      <Table>
        <TableCaption>Lista de usuários.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead className='text-right'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id.substring(0, 6)}...</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.role === 'admin' ? (
                  <Badge>Administrador</Badge>
                ) : (
                  <Badge variant='secondary'>Usuário</Badge>
                )}
              </TableCell>
              <TableCell className='flex items-center justify-end gap-2'>
                <Button
                  asChild
                  variant='outline'
                  size='icon'
                  title='Detalhe do usuário'
                  aria-label='Detalhe do usuário'
                >
                  <Link
                    href={`/admin/users/${user.id}`}
                    className='flex items-center justify-center gap-1'
                  >
                    <LinkLoader iconName='search' />
                  </Link>
                </Button>

                <DeleteDialog id={user.id} action={deleteUser} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
