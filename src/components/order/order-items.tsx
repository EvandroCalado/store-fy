import Image from 'next/image';
import Link from 'next/link';

import { CartItem } from '@/types/cart-item';
import { formatCurrency } from '@/utils/formatCurrency';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type OrderItemsProps = {
  items: CartItem[];
};

export const OrderItems = ({ items }: OrderItemsProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead className='text-center'>Quantidade</TableHead>
          <TableHead className='text-right'>Preço</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.slug}>
            <TableCell className='p-0'>
              <Link
                href={`/product/${item.slug}`}
                className='flex items-center gap-2'
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  priority
                  className='size-12 object-contain'
                />
                <span className='line-clamp-1'>{item.name}</span>
              </Link>
            </TableCell>
            <TableCell className='text-center'>{item.quantity}</TableCell>
            <TableCell className='text-right'>
              {formatCurrency(item.price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
