import { marked } from 'marked';

import { auth } from '@/auth';
import { Product } from '@/types/product';

import { ReviewList } from '../review/review-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type ProductTabsProps = {
  product: Product;
};

export async function ProductTabs({ product }: ProductTabsProps) {
  const htmlContent = marked.parse(product.details);

  const session = await auth();
  const userId = session?.user?.id ?? '';

  return (
    <div className='flex items-center justify-center md:col-span-5 xl:col-span-8'>
      <Tabs defaultValue='details' className='w-full'>
        <TabsList className='w-full rounded-none border-b bg-transparent'>
          <TabsTrigger
            value='details'
            className='text-muted-foreground data-[state=active]:text-foreground flex-[0] cursor-pointer text-base data-[state=active]:shadow-none'
          >
            Detalhes
          </TabsTrigger>
          <TabsTrigger
            value='reviews'
            className='text-muted-foreground data-[state=active]:text-foreground flex-[0] cursor-pointer text-base data-[state=active]:shadow-none'
          >
            Avaliações
          </TabsTrigger>
        </TabsList>
        <TabsContent value='details' className='text-muted-foreground my-4'>
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className='info'
          />
        </TabsContent>
        <TabsContent value='reviews'>
          <ReviewList
            userId={userId}
            productId={product.id}
            productSlug={product.slug}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
