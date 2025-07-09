import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { TotalProvider } from '@/context/TotalContext';
import WhatsappButton from '@/components/WhatsappButton'; // Adjust the path if needed
import { Toaster } from 'react-hot-toast';


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
                    <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />

            <WhatsappButton />
          </CartProvider>
        </TotalProvider>
      </body>
    </html>
  );
}
