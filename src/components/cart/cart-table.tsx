'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ArrowLeft, Loader2, PackageOpen } from 'lucide-react';

import { useCart } from '@/hooks/useCart';
import { Cart } from '@/types/cart';
import { formatCurrency } from '@/utils/formatCurrency';

import { ProductQuantity } from '../product/product-quantity';
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

type CartTableProps = {
  cart?: Cart;
};

export const CartTable = ({ cart }: CartTableProps) => {
  const { handleAddToCart, handleRemoveFromCart, isPending, startTransition } =
    useCart();

  const router = useRouter();

  return (
    <>
      {cart && cart.items.length > 0 ? (
        <div className='snap-x overflow-x-auto md:col-span-3'>
          <Table>
            <TableCaption>Lista de produtos no carrinho.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className='text-center'>Quantidade</TableHead>
                <TableHead className='text-right'>Preço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.items.map(item => (
                <TableRow key={item.slug}>
                  <TableCell>
                    <Link
                      href={`/products/${item.slug}`}
                      className='flex items-center gap-2'
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        priority
                        className='h-[50px] w-[50px] object-contain'
                      />
                      <span className='line-clamp-1'>{item.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className='text-center'>
                    <ProductQuantity
                      handleAddToCart={() => handleAddToCart(item)}
                      handleRemoveFromCart={() => handleRemoveFromCart(item)}
                      isPending={isPending}
                      quantity={item.quantity}
                      className='mx-auto'
                    />
                  </TableCell>
                  <TableCell className='text-right'>
                    {formatCurrency(item.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className='col-span-4 flex flex-1 flex-col items-center justify-center gap-8'>
          <p className='text-muted-foreground text-2xl font-semibold md:text-3xl'>
            Seu carrinho está vazio
          </p>

          <PackageOpen className='text-muted-foreground size-44 stroke-1' />

          <Button
            disabled={isPending}
            onClick={() => startTransition(() => router.push('/'))}
          >
            {isPending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <ArrowLeft className='size-4' />
            )}
            Voltar para home
          </Button>
        </div>
      )}
    </>
  );
};
