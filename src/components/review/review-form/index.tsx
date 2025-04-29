'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, PencilLine } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createReview } from '@/actions/review/create-review';
import { getReviewByUser } from '@/actions/review/get-review-by-user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { createReviewSchema } from '@/schemas/create-review';
import { REVIEW_DEFAULT } from '@/utils/constants';

type ReviewForm = z.infer<typeof createReviewSchema>;

type ReviewFormProps = {
  label?: string;
  userId: string;
  productId: string;
};

export function ReviewForm({
  label = 'Avaliar o produto',
  userId,
  productId,
}: ReviewFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<ReviewForm>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: REVIEW_DEFAULT,
  });

  async function handleOpenForm() {
    form.setValue('userId', userId);
    form.setValue('productId', productId);

    const review = await getReviewByUser(productId);

    if (review) {
      form.setValue('title', review.title);
      form.setValue('description', review.description);
      form.setValue('rating', review.rating);
    }

    setOpen(true);
  }

  async function onSubmit(data: ReviewForm) {
    const res = await createReview({ ...data, productId });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    setOpen(false);

    toast.success(res.message);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={handleOpenForm}>{label}</Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Avaliar o produto</DialogTitle>
          <DialogDescription>
            Avalie o produto para ajudar outros usuários.
          </DialogDescription>
        </DialogHeader>

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
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                    className='flex items-center justify-between gap-2'
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <FormItem key={index} className='flex items-center gap-2'>
                        <FormControl>
                          <RadioGroupItem value={(index + 1).toString()} />
                        </FormControl>
                        <FormLabel>{index + 1} ★</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>

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
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
