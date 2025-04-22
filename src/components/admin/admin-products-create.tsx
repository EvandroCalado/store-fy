'use client';

import { useTransition } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { UploadButton } from '@/utils/uploadthing';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
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

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

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
      type === 'create' ? createProductSchema : updateProductSchema,
    ),
    defaultValues: type === 'create' ? PRODUCT_DEFAULT : product,
  });

  const onSubmit = async (value: CreateProductSchema | UpdateProductSchema) => {
    if (type === 'create') {
      const res = await createProduct(value);

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
        ...value,
      });

      if (!res.success) {
        console.log(res.message);
        toast.error(res.message);
        return;
      }

      console.log(res);
      toast.success(res.message);

      router.push('/admin/products');
    }
  };

  const images = form.watch('images');
  const isFeatured = form.watch('isFeatured');
  const banner = form.watch('banner');

  return (
    <Form {...form}>
      <h1 className='mb-4 text-xl font-semibold'>
        {type === 'create' ? 'Criar' : 'Editar'} produto
      </h1>

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
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Imagens</FormLabel>
                <Card className='min-h-28 rounded-md shadow-none'>
                  <CardContent className='flex flex-wrap items-center gap-4'>
                    {images?.map(image => (
                      <Image
                        key={image}
                        src={image}
                        alt='Product image'
                        width={100}
                        height={100}
                        priority
                        className='h-20 w-20 rounded-sm object-cover object-center'
                      />
                    ))}

                    <FormControl>
                      <UploadButton
                        endpoint='imageUploader'
                        onClientUploadComplete={(res: { ufsUrl: string }[]) => {
                          form.setValue('images', [...images, res[0].ufsUrl]);
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(`ERROR! ${error.message}`);
                        }}
                        // content={{
                        //   button({ ready, isUploading }) {
                        //     if (ready) return <div>Escolher imagem</div>;
                        //     if (isUploading) return <div>Enviando...</div>;

                        //     return 'Carregando...';
                        //   },
                        // }}
                        // appearance={{
                        //   allowedContent: 'text-foreground',
                        //   button({ ready, isUploading }) {
                        //     return {
                        //       color: '#aaa',
                        //       fontWeight: '600',
                        //       ...(ready && { color: '#aaa' }),
                        //       ...(isUploading && { color: '#aaa' }),
                        //     };
                        //   },
                        // }}
                      />
                    </FormControl>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='upload-field flex flex-col gap-1.5'>
          {/* is featured */}
          <p className='text-sm font-medium'>Produto em Destaque</p>
          <Card className='min-h-28 w-full rounded-md shadow-none'>
            <CardContent className='space-y-2'>
              <FormField
                control={form.control}
                name='isFeatured'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Em Destaque?</FormLabel>
                  </FormItem>
                )}
              />

              {isFeatured && banner && (
                <Image
                  src={banner}
                  alt='Product banner'
                  width={1920}
                  height={600}
                  priority
                  className='w-full rounded-sm object-cover object-center'
                />
              )}

              {isFeatured && !banner && (
                <UploadButton
                  endpoint='imageUploader'
                  onClientUploadComplete={(res: { ufsUrl: string }[]) => {
                    form.setValue('banner', res[0].ufsUrl);
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </CardContent>
          </Card>
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
            <FormItem className='w-full'>
              <FormLabel>Detalhe</FormLabel>
              <FormControl>
                <div className='container' data-color-mode='light'>
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
