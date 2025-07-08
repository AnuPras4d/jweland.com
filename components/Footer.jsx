'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const contactInfo = [
    'jewelandcty@gmail.com',
    '+91 9072969697',
    'Jeweland Precious Metals, Door No: 13/655, Kalathil Building, Near Faihas Wedding Mall, Main Road, Cheruthuruthy',
  ];

  return (
    <footer className="bg-[#0a1d37] text-white pt-10 pb-6 px-6 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Logo & About */}
        <div>
          <Image
            src="/footerlogo.svg"
            alt="JWELAND Logo"
            width={240}
            height={40}
            className="object-contain mb-3"
          />
          <p className="text-gray-400 leading-relaxed text-xs">
            Jeweland's 925 silver jewellery blends timeless elegance with modern style—crafted from sterling silver, skin-safe, anti-tarnish, and perfect for daily or special wear.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Contact Info</h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            {contactInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Our Policy</Link>
            </li>
            <li>
              <Link href="/srishti" className="hover:text-white transition-colors">Srishti Collection</Link>
            </li>
            <li>
              <Link href="/#productlist" className="hover:text-white transition-colors">Shop Now</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto mt-8 border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-xs space-y-3 sm:space-y-0">
        <div>
          © 2025 <span className="font-semibold text-white">Jeweland Precious Metals</span>. All rights reserved.
        </div>
        <div>
          Powered By <a href="https://koremaed.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors font-semibold">Koremaed</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;