import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type ProductTabsProps = {
  details: string;
};

export const ProductTabs = ({ details }: ProductTabsProps) => {
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
          {details}
        </TabsContent>
        <TabsContent value='reviews'>Avaliações</TabsContent>
      </Tabs>
    </div>
  );
};
