'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import MDEditor from '@uiw/react-md-editor';
import { Loader, SaveAll } from 'lucide-react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import { toast } from 'sonner';
import { z } from 'zod';

import { createProduct } from '@/actions/create-product';
import { updateProduct } from '@/actions/update-product';
import { createProductSchema } from '@/schemas/create-product';
import { updateProductSchema } from '@/schemas/update-product';
import { Product } from '@/types/product';
import { PRODUCT_DEFAULT } from '@/utils/constants';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

type CreateProductSchema = z.infer<typeof createProductSchema>;
type UpdateProductSchema = z.infer<typeof updateProductSchema>;

type AdminProductsCreateProps = {
  type: 'create' | 'update';
  product?: Product;
  productId?: string;
};

export const AdminProductsCreate = ({
  type,
  product,
  productId,
}: AdminProductsCreateProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CreateProductSchema | UpdateProductSchema>({
    resolver: zodResolver(
      type === 'create' ? createProductSchema : createProductSchema,
    ),
    defaultValues: type === 'create' ? PRODUCT_DEFAULT : product,
  });

  const onSubmit = async (value: CreateProductSchema | UpdateProductSchema) => {
    if (type === 'create') {
      const res = await createProduct({ ...value, price: Number(value.price) });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      router.push('/admin/products');
    }

    if (type === 'update') {
      const res = await updateProduct({
        id: productId as string,
        price: Number(value.price),
        ...value,
      });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      router.push('/admin/products');
    }
  };

  return (
    <Form {...form}>
      <h1 className='mb-4 text-xl font-semibold'>Criar produto</h1>

      <form
        className='w-full space-y-12'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex w-full flex-col gap-5 md:flex-row'>
          {/* name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Digite o nome' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* slug */}
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem className='relative w-full'>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Gerar automaticamente' />
                </FormControl>
                <Button
                  type='button'
                  size='sm'
                  variant='secondary'
                  onClick={() =>
                    form.setValue(
                      'slug',
                      slugify(form.getValues('name'), { lower: true }),
                    )
                  }
                  className='absolute -bottom-10 left-0'
                >
                  Gerar slug
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          {/* category */}
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Digite uma categoria' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* brand */}
          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Digite a marca' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          {/* price */}
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='number'
                    placeholder='Digite o preço'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* stock */}
          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='number'
                    placeholder='Digite a quantidade em estoque'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='upload-field flex flex-col gap-5 md:flex-row'>
          {/* Images */}
        </div>

        <div className='upload-field flex flex-col gap-5 md:flex-row'>
          {/* is featured */}
        </div>

        {/* description */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='Digite uma descrição' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* details */}
        <FormField
          control={form.control}
          name='details'
          render={({ field }) => (
            <FormItem className='w-full' data-color-mode='light'>
              <FormLabel>Detalhe</FormLabel>
              <FormControl>
                <div className='container'>
                  <MDEditor
                    {...field}
                    value={field.value}
                    onChange={value => form.setValue('details', value || '')}
                    textareaProps={{
                      placeholder: 'Digite os detalhe do produto',
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='upload-field flex flex-col gap-5 md:flex-row'>
          {/* submit button */}
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader className='animate-spin' />
            ) : (
              <SaveAll />
            )}
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
};
