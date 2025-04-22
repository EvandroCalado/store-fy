'use client';

import { useState, useTransition } from 'react';

import { Wallet } from 'lucide-react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

type UpdateDialogProps = {
  orderId: string;
  action: (orderId: string) => Promise<{ success?: boolean; message: string }>;
  isPaid?: boolean;
};

export const UpdateDialog = ({
  orderId,
  action,
  isPaid,
}: UpdateDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUpdateClick = async () => {
    startTransition(async () => {
      const res = await action(orderId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      setIsOpen(false);

      toast.success(res.message);
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          title='Marcar como pago'
          aria-label='Marcar como pago'
          disabled={isPaid}
        >
          <Wallet />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          <Button
            variant='secondary'
            disabled={isPending}
            onClick={handleUpdateClick}
          >
            {isPending ? 'Carregando...' : 'Marcar como pago'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
