'use client';

import { useState, useTransition } from 'react';

import { Trash } from 'lucide-react';
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

type DeleteDialogProps = {
  id: string;
  action: (orderId: string) => Promise<{ success?: boolean; message: string }>;
  isDelivered?: boolean;
};

export const DeleteDialog = ({
  id,
  action,
  isDelivered,
}: DeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = async () => {
    startTransition(async () => {
      const res = await action(id);

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
          title='Excluir'
          aria-label='Excluir'
          disabled={isDelivered}
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          <Button
            variant='destructive'
            disabled={isPending}
            onClick={handleDeleteClick}
          >
            {isPending ? 'Excluindo...' : 'Excluir'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
