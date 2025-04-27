'use client';

import { useState, useTransition } from 'react';

import { PackageCheck } from 'lucide-react';
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

type DeliverDialogProps = {
  orderId: string;
  action: (orderId: string) => Promise<{ success?: boolean; message: string }>;
  isDelivered?: boolean;
};

export function DeliverDialog({
  orderId,
  action,
  isDelivered,
}: DeliverDialogProps) {
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
          title='Marcar como entregue'
          aria-label='Marcar como entregue'
          disabled={isDelivered}
        >
          <PackageCheck />
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
            {isPending ? 'Carregando...' : 'Marcar como entregue'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
