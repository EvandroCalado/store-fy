import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className='flex flex-1 flex-col'>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
