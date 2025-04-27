import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { addItemToCart } from '@/actions/add-item-to-cart';
import { removeItemFromCart } from '@/actions/remove-item-from-cart';
import { CartItem } from '@/types/cart-item';

export function useCart() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleAddToCart = async (item: CartItem) => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast(<p className='capitalize'>{res.message}</p>, {
        action: {
          label: 'Ir para o carrinho',
          onClick: () => {
            router.push('/cart');
          },
        },
      });
    });
  };

  const handleRemoveFromCart = async (item: CartItem) => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast(<p className='capitalize'>{res.message}</p>, {
        action: {
          label: 'Ir para o carrinho',
          onClick: () => {
            router.push('/cart');
          },
        },
      });
    });
  };

  return {
    handleAddToCart,
    handleRemoveFromCart,
    isPending,
    startTransition,
  };
}
