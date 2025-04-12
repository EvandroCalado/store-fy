import Image from 'next/image';
import Link from 'next/link';

import { CartItem } from '@/types/cart-item';
import { formatCurrency } from '@/utils/formatCurrency';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type OrderItemsProps = {
  cartItems: CartItem[];
};

export const OrderItems = ({ cartItems }: OrderItemsProps) => {
  return (
    <Card className='gap-2 p-5'>
      <CardHeader className='p-0'>
        <CardTitle>Pedido</CardTitle>
      </CardHeader>

      <CardContent className='text-muted-foreground p-0'>
        <Table>
          <TableCaption>Lista de produtos comprados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className='text-center'>Quantidade</TableHead>
              <TableHead className='text-right'>Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map(item => (
              <TableRow key={item.slug}>
                <TableCell className='p-0'>
                  <Link
                    href={`/products/${item.slug}`}
                    className='flex items-center gap-2'
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                    <span>{item.name}</span>
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
      </CardContent>
    </Card>
  );
};
