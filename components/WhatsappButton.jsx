'use client';

import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function WhatsappButton() {
  const pathname = usePathname();
  const phoneNumber = '9072969697';

  const showChatButton =
    pathname === '/' || (pathname && !pathname.startsWith('/admin'));

  if (!showChatButton) return null;

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
    </a>
  );
}
