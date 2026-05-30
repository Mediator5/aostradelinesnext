import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import StickyCheckoutBar from '@/components/StickyCheckoutBar';
import FloatingActions from '@/components/FloatingActions';

export const metadata: Metadata = {
  title: 'AOS Tradelines',
  description: 'Premium tradeline services',
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
