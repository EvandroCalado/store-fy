const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='bg-muted flex flex-1 items-center justify-center'>
      {children}
    </main>
  );
};

export default AuthLayout;
