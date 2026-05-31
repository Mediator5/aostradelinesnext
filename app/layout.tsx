import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import StickyCheckoutBar from '@/components/StickyCheckoutBar';
import FloatingActions from '@/components/FloatingActions';

export const metadata: Metadata = {
  metadataBase: new URL('https://aostradelines.com'),
  title: 'AOS Tradelines',
  description: 'Premium tradeline services — high-limit, aged tradelines to elevate your credit profile.',
  openGraph: {
    title: 'AOS Tradelines',
    description: 'Premium tradeline services — high-limit, aged tradelines to elevate your credit profile.',
    images: [
      {
        url: '/aoslogo2.jpeg',
        width: 1200,
        height: 630,
        alt: 'AOS Tradelines Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AOS Tradelines',
    description: 'Premium tradeline services — high-limit, aged tradelines to elevate your credit profile.',
    images: ['/aoslogo2.jpeg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <FloatingActions />
          <StickyCheckoutBar />
        </CartProvider>
      </body>
    </html>
  );
}
