import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
/* providers */
import MuiThemeProvider from '@providers/themeProvider/provider';
import ToastProvider from '@providers/toastProvider/provider';
import SidebarProvider from '@providers/sidebarProvider/provider';
import ReactQueryProvider from '@providers/queryProvider/provider';
import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Bambai Plus Dashboard',
  description: 'Bambai Plus',
};

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <AppRouterCacheProvider options={{enableCssLayer: true}}>
        <MuiThemeProvider>
          <ToastProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ToastProvider>
        </MuiThemeProvider>
      </AppRouterCacheProvider>
    </ReactQueryProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id='app' className={`${roboto.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
