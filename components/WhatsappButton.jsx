'use client';

import { Instagram, Facebook, MessageCircle, Users, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SocialMediaButtons() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = '919072969697';

  const showButtons =
    pathname === '/' || (pathname && !pathname.startsWith('/jewe-adm') && !pathname.startsWith('/payment') && !pathname.startsWith('/cart'));

  if (!showButtons) return null;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Social Media Buttons */}
      <div className={`flex flex-col items-center gap-2 mb-4 transition-all duration-500 ease-in-out ${
        isExpanded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
      }`}>
        
        {/* Instagram Button */}
        <Link
          href="https://www.instagram.com/jeweland_preciousmetals?igsh=ODB2eWN3NzFyaHhn"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative bg-white hover:bg-gray-50 text-pink-500 w-10 h-10 rounded-full shadow-lg border-2 border-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
          aria-label="View on Instagram"
        >
          <Instagram className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Follow us on Instagram
          </div>
        </Link>

        {/* Facebook Button */}
        <Link
          href="https://www.facebook.com/share/1BCxcwqcbk/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative bg-white hover:bg-gray-50 text-blue-600 w-10 h-10 rounded-full shadow-lg border-2 border-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
          aria-label="View on Facebook"
        >
          <Facebook className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Like us on Facebook
          </div>
        </Link>

        {/* WhatsApp Button */}
        <Link
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative bg-white hover:bg-gray-50 text-green-500 w-10 h-10 rounded-full shadow-lg border-2 border-green-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Chat with us
          </div>
        </Link>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={toggleExpanded}
        className={`relative w-12 h-12 rounded-full shadow-lg transition-all duration-500 transform hover:scale-105 ${
          isExpanded 
            ? 'bg-white text-red-500 border-2 border-red-500 hover:bg-gray-50' 
            : 'bg-blue-900 hover:bg-blue-800 text-white border-2 border-white'
        } hover:shadow-xl flex items-center justify-center`}
        style={{
          backgroundColor: isExpanded ? 'white' : '#1e3a8a',
          borderColor: isExpanded ? '#ef4444' : 'white'
        }}
        aria-label={isExpanded ? 'Close social media menu' : 'Open social media menu'}
      >
        {isExpanded ? (
          <X className="w-4 h-4 transition-transform duration-300" />
        ) : (
          <Users className="w-4 h-4 transition-transform duration-300" />
        )}
        
        {/* Pulse animation when closed */}
        {!isExpanded && (
          <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-30"></div>
        )}
      </button>
    </div>
  );
}