import type { Metadata } from 'next';
import { Jost } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

import '@/styles/globals.css';

import { CONSTANTS } from '@/utils/constants';

import { ThemeProvider } from './theme-provider';

const primary = Jost({
  variable: '--font-primary',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: `%s | StoreFy`,
    default: CONSTANTS.APP_NAME,
  },
  description: CONSTANTS.APP_DESCRIPTION,
  metadataBase: new URL(CONSTANTS.SERVER_URL),
  appleWebApp: {
    title: CONSTANTS.APP_NAME,
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body
        className={`${primary.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster invert />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
