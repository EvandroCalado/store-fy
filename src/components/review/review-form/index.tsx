'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { PencilLine } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createReviewSchema } from '@/schemas/create-review';
import { REVIEW_DEFAULT } from '@/utils/constants';

type ReviewForm = z.infer<typeof createReviewSchema>;

type ReviewFormProps = {
  userId: string;
  productId: string;
  onReviewSubmitted?: () => void;
};

export function ReviewForm({
  userId,
  productId,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<ReviewForm>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: REVIEW_DEFAULT,
  });

  const onSubmit = (data: ReviewForm) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Avalie o produto</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Avaliar o produto</DialogTitle>
          <DialogDescription>
            Avalie o produto para ajudar outros usuários.
          </DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Ex: Ótimo produto!' />
                    </FormControl>
                    <FormMessage className='absolute -bottom-5 left-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder='Ex: Gostei muito!' />
                    </FormControl>
                    <FormMessage className='absolute -bottom-5 left-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='rating'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Nota</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Selecione uma nota' />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Array.from({ length: 5 }, (_, index) => (
                          <SelectItem
                            key={index}
                            value={(index + 1).toString()}
                          >
                            {index + 1} ★
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className='absolute -bottom-5 left-0' />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <Loader className='animate-spin' />
                  ) : (
                    <PencilLine />
                  )}
                  Publicar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
