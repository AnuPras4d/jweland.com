import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { TotalProvider } from '@/context/TotalContext';
import WhatsappButton from '@/components/WhatsappButton'; // Adjust the path if needed

export const metadata = {
  title: 'Jweland',
  description: 'jwelrerry',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TotalProvider>
          <CartProvider>
            {children}
            <WhatsappButton />
          </CartProvider>
        </TotalProvider>
      </body>
    </html>
  );
}
