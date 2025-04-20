import Link from 'next/link';

import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';

import { LinkLoader } from '../shared/link-loader';
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

type AdminProductsProps = {
  products: Product[];
};

export const AdminProducts = ({ products }: AdminProductsProps) => {
  return (
    <div className='flex-1'>
      <Table>
        <TableCaption>Lista de produtos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead>Avaliações</TableHead>
            <TableHead className='text-right'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.id.substring(0, 6)}...</TableCell>
              <TableCell className='capitalize'>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell className='capitalize'>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell className='text-right'>
                <Button
                  variant={'outline'}
                  size={'icon'}
                  title='Editar'
                  aria-label='Editar'
                >
                  <Link href={`/admin/product/${product.id}`}>
                    <LinkLoader iconName='Edit' />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
