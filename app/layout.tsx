import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { APP_METADATA } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  title: APP_METADATA.title,
  description: APP_METADATA.description,
  keywords: APP_METADATA.keywords,
  authors: [{ name: APP_METADATA.author }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_METADATA.url,
    title: APP_METADATA.title,
    description: APP_METADATA.description,
    images: [
      {
        url: APP_METADATA.image,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_METADATA.title,
    description: APP_METADATA.description,
    images: [APP_METADATA.image],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
